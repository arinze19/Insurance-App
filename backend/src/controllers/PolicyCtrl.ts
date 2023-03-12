import { ErrorHandler } from '../helpers';
// import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaClient, Prisma } from '../../node_modules/.prisma/client';
import type { Request, Response, NextFunction } from 'express'; 


const prisma = new PrismaClient();

enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DROPPED_OUT = 'DROPPED_OUT',
}

class PolicyCtrl {
  static async getPolicies(req: Request, res: Response, next: NextFunction) {
    let { search, filter, offset = 0 } = req.query;
    const skip = +offset as unknown as number;
    const take = 10;

    const or: Prisma.PolicyWhereInput = search
      ? {
          OR: [
            { provider: { contains: search as string, mode: 'insensitive' } },
            {
              customer: {
                firstName: { contains: search as string, mode: 'insensitive' },
              },
            },
            {
              customer: {
                lastName: { contains: search as string, mode: 'insensitive' },
              },
            },
            {
              familyMembers: {
                some: {
                  name: { contains: search as string, mode: 'insensitive' },
                },
              },
            },
          ],
        }
      : {};

    // prevent users from filtering dropped and cancelled policies
    if (filter && filter !== 'ACTIVE' && filter !== 'PENDING') {
      return next(
        new ErrorHandler(
          `Sorry, you can not filter for ${filter} at this point`,
          400
        )
      );
    }

    const and: Prisma.PolicyWhereInput = filter
      ? {
          AND: [{ status: filter as unknown as PolicyStatus }],
        }
      : { AND: [{ OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }] }] };

    const policies = await prisma.policy.findMany({
      where: {
        ...or,
        ...and,
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          },
        },
      },
      skip,
      take,
    });

    const count = await prisma.policy.count({
      where: {
        ...or,
        ...and,
      },
    });

    const current = skip / take + 1;
    const max = Math.round(count / take);

    res.status(200).json({
      policies,
      page: {
        count,
        current,
        max,
        offset: skip,
        from: max == 0 ? 0 : (current - 1) * take + 1,
        to: current < max ? current * take : count,
      },
    });
  }

  static async addPolicyFamily(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name } = req.body;
    const { policyId } = req.params;

    const [familyExist, count] = await Promise.all([
      await prisma.family.findFirst({
        where: {
          policyId: policyId,
          name: { contains: name as string, mode: 'insensitive' },
        },
        select: {
          name: true,
          policy: true,
        },
      }),
      await prisma.family.count({
        where: {
          policyId,
        },
      }),
    ]);

    // CONFLICT ERROR
    if (familyExist) {
      return next(
        new ErrorHandler(
          `Sorry, ${familyExist.name} is already a family member on this policy`,
          409
        )
      );
    }

    // prevent user from adding more than 3 family members to a policy
    if (count >= 3) {
      return next(
        new ErrorHandler(
          'Sorry, you cannot have more than 3 family members on a policy',
          400
        )
      );
    }

    const family = await prisma.family.create({
      data: {
        name: name,
        policyId: policyId,
      },
    });

    res.status(201).json(family);
  }

  static async removePolicyFamily(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { policyId, familyId } = req.params;

    const data = await prisma.family.findFirst({
      where: {
        policyId,
        id: familyId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!data) {
      return next(
        new ErrorHandler(
          `Sorry, there is no family member with id: ${familyId} on this policy`,
          404
        )
      );
    }

    const user = await prisma.family.delete({
      where: {
        id: data.id,
      },
    });

    res.status(201).send(user);
  }

  static async getPolicyFamily(req: Request, res: Response) {
    const { policyId } = req.params;

    const data = await prisma.family.findMany({
      where: {
        policyId: policyId,
      },
      select: {
        id: true,
        name: true,
        policyId: true,
      },
    });

    res.status(200).json(data);
  }

  static async getPolicy(req: Request, res: Response, next: NextFunction) {
    const { policyId } = req.params;

    const policy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
      select: {
        id: true,
        insuranceType: true,
        provider: true,
        status: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        familyMembers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!policy) {
      return next(
        new ErrorHandler(
          `Sorry, Policy with id - ${policyId} cannot be found`,
          404
        )
      );
    }

    res.status(200).json(policy);
  }
}

export default PolicyCtrl;

import type { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { ErrorHandler } from '../helpers';

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
        familyMembers: {
          select: {
            name: true,
          },
        },
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

  static async addFamily(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const { policyId } = req.params;

    const [policy, familyExist] = await Promise.all([
      await prisma.policy.findUnique({
        where: {
          id: policyId,
        },
      }),
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
    ]);

    // prevent users from adding a family member to expired or dropped policies
    if (policy && policy.status !== 'ACTIVE' && policy.status !== 'PENDING') {
      return next(
        new ErrorHandler(
          `Sorry, You can not update this policy as it is currently ${policy.status}`,
          400
        )
      );
    }

    // NOT FOUND ERROR
    if (!policy) {
      return next(
        new ErrorHandler(
          `Sorry there are no policies with the id: ${policyId}`,
          404
        )
      );
    }

    // CONFLICT ERROR
    if (familyExist) {
      return next(
        new ErrorHandler(
          `Sorry, ${familyExist.name} is already a family member on this policy`,
          409
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

  static async getAllFamily(req: Request, res: Response, next: NextFunction) {
    const { customerId } = req.params;

    const data = await prisma.policy.findMany({
      where: {
        customerId: customerId,
      },
      select: {
        familyMembers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(data);
  }
}

export default PolicyCtrl;

import type { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma, Policy } from '@prisma/client';

// error handlers
import { ErrorHandler } from '../helpers/ErrorHelpers';

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

    const queryCount = await prisma.policy.count({
      where: {
        ...or,
        ...and
      }
    })

    res.status(200).json({
      policies, 
      queryCount, 
      maxPage: Math.round(queryCount / take), 
      currentPage: (skip / take) + 1
    });
  }

  static async addFamilyMember(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name } = req.body;
    const { policyId } = req.params;

    const policy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });

    const familyExist = await prisma.family.findFirst({
      where: {
        policyId: policyId,
        name: name
      }
    })

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

    if (!name) {
      return next(new ErrorHandler('A name field is required', 400));
    }

    if(familyExist) {
      return next(new ErrorHandler(`Sorry, ${familyExist.name} is already a family member on this policy`, 409))
    }

    const family = await prisma.family.create({
      data: {
        name: name,
        policyId: policyId,
      },
    });

    res.status(201).json(family);
  }

  static async getCustomerFamilyMembers(req: Request, res: Response, next:NextFunction) {
    const { customerId } = req.params;

    const data = await prisma.customer.findUnique({
      where: {
        id: customerId
      },
      select: {
        policies: {
          select: {
            familyMembers: true
          }
        }
      }
    })

    res.status(200).json(data)
  }
}

export default PolicyCtrl;

import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

class CustomerCtrl {
  static async getFamily(req: Request, res: Response, next: NextFunction) {
    const { customerId } = req.params;

    const policies = await prisma.policy.findMany({
      select: {
        id: true,
      },
      where: {
        customerId,
      },
    });

    const data = await prisma.family.findMany({
      where: {
        policyId: {
          in: policies.map((item) => item['id']),
        },
      },
    });

    res.status(200).json(data);
  }
}

export default CustomerCtrl;

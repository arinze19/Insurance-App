import Joi from 'joi';
import { ErrorHandler } from '../helpers/ErrorHelper';
import { NextFunction, Request, Response } from 'express';

class PolicyVld {
  static validateFamilyAdd(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().trim().min(4).max(25).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      let message = '';
      error.details.forEach((msg) => {
        message += `${msg.message};`;
      });

      return next(new ErrorHandler(message, 400));
    } else {
      next();
    }
  }

  static validateFamilyGet(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      policyId: Joi.string().uuid().required(),
    });

    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      let message = '';
      error.details.forEach((msg) => {
        message += `${msg.message};`;
      });

      return next(new ErrorHandler(message, 400));
    } else {
      next();
    }
  }
}

export default PolicyVld;

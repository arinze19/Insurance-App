import Joi from 'joi';
import { ErrorHandler } from '../helpers/ErrorHelper';
import { NextFunction, Request, Response } from 'express';



class FamilyVld {
  static validateGet(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      customerId: Joi.string().uuid().required(),
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

export default FamilyVld;

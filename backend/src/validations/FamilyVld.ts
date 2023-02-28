import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ErrorHandler } from '../helpers/ErrorHelpers';

class FamilyVld {
  static validateAdd(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().min(4).max(20).required(),
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

  
}

export default FamilyVld;

import type { Router } from 'express';
import { FamilyVld } from '../validations';
import { CustomerCtrl } from '../controllers';
import { AsyncMiddleware } from '../middleware';

class CustomerRoutes {
  static route(router: Router) {
    router
      /**
       * GET /customers/:customerId/family
       * @summary returns all family members of a customer
       * @tags customer
       * @produces application/json
       * @returns {Array<Family>} 200 - successful retrieval
       * @returns {ErrorResponse} 500 - server error
       * @returns {ErrorResponse} 400 - client error
       */
      .route('/customers/:customerId/family')
      .get(
        FamilyVld.validateGet,
        AsyncMiddleware.handle(CustomerCtrl.getFamily)
      );
  }
}

export default CustomerRoutes;

import { IRouter } from 'express';
import { PolicyCtrl } from '../controllers';
import { FamilyVld } from '../validations';
import { AsyncMiddleware } from '../middleware';

class PolicyRoutes {
  static route(router: IRouter) {
    router
      .route('/policies')
      .get(AsyncMiddleware.handle(PolicyCtrl.getPolicies));
    router
      .route('/policies/:policyId/add-family')
      .post(
        FamilyVld.validateAdd,
        AsyncMiddleware.handle(PolicyCtrl.addFamily)
      );
    router
      .route('/customers/:customerId/all-family')
      .get(AsyncMiddleware.handle(PolicyCtrl.getAllFamily));
  }
}

export default PolicyRoutes;

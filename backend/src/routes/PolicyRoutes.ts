import { IRouter } from 'express';
import PolicyCtrl from '../controllers/PolicyCtrl';


class PolicyRoutes {
  static route(router: IRouter) {
    router.route('/policies').get(PolicyCtrl.getPolicies)
    router.route('/policies/:policyId/add-family').post(PolicyCtrl.addFamilyMember)
    router.route('/customers/:customerId/family').get(PolicyCtrl.getCustomerFamilyMembers)
  }
}

export default PolicyRoutes

import { Router, IRouter } from 'express';
import PolicyCtrl from '../controllers/PolicyCtrl';

// const router = Router();

class PolicyRoutes {
  static route(router: IRouter) {
    router.route('/policies').get(PolicyCtrl.getPolicies)
  }
}

// router.get('/policies', PolicyCtrl.getPolicies)
// router.get('/policies/test', PolicyCtrl.test)
// router.post('/policies/:policyId/add-family', PolicyCtrl.addFamilyMember);

// export default router;
export default PolicyRoutes

import { Router } from 'express';
import PolicyCtrl from '../controllers/PolicyCtrl';

const router = Router();


router.get('/policies', PolicyCtrl.getPolicies)
router.post('/policies/:policyId/add-family', PolicyCtrl.addFamilyMember);
router.get('/customers/:customerId/family', PolicyCtrl.getCustomerFamilyMembers);


export default router;
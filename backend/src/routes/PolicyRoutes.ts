import { IRouter } from 'express';
import { PolicyCtrl } from '../controllers';
import { PolicyVld } from '../validations';
import { AsyncMiddleware } from '../middleware';

class PolicyRoutes {
  static route(router: IRouter) {
    /**
     * GET /policies
     * @summary returns all available policies
     * @tags policy
     * @produces application/json
     * @returns {Array<Policy>} 200 - successful retrieval
     * @returns {ErrorResponse} 500 - server error
     * @returns {ErrorResponse} 400 - client error
     */
    router
      .route('/policies')
      .get(AsyncMiddleware.handle(PolicyCtrl.getPolicies));
    /**
     * GET /policy/:policyId
     * @tags policy
     * @summary returns an individual policy
     * @produces application/json
     * @returns {Policy} 200 - successful retrieval
     * @returns {ErrorResponse} 500 - server error
     * @returns {ErrorResponse} 400 - client error
     */
    router
      .route('/policies/:policyId')
      .get(AsyncMiddleware.handle(PolicyCtrl.getPolicy));
    /**
     * GET /policies/:policyId/family
     * @tags policy
     * @summary gets all family members associated with a policy
     * @produces application/json
     * @returns {Array<Family>} 200 - successful retrieval
     * @returns {ErrorResponse} 500 - server error
     * @returns {ErrorResponse} 400 - client error
     */
    /**
     * POST /policies/:policyId/family
     * @tags policy
     * @summary adds a family member to a policy
     * @produces application/json
     * @param {FamilyAdd} request.body.required - name of family member - application/json
     * @returns {Family} 200 - successful addition
     * @returns {ErrorResponse} 500 - server error
     * @returns {ErrorResponse} 400 - client error
     */
    router
      .route('/policies/:policyId/family')
      .get(
        PolicyVld.validateFamilyGet,
        AsyncMiddleware.handle(PolicyCtrl.getPolicyFamily)
      )
      .post(
        PolicyVld.validateFamilyAdd,
        AsyncMiddleware.handle(PolicyCtrl.addPolicyFamily)
      );
    /**
     * DELETE /policies/:policyId/family/:familyId
     * @tags policy
     * @summary deletes a family member from a policy
     * @produces application/json
     * @returns {Array<Family>} 200 - successful removal
     * @returns {ErrorResponse} 500 - server error
     * @returns {ErrorResponse} 400 - client error
     */
    router
      .route('/policies/:policyId/family/:familyId')
      .delete(AsyncMiddleware.handle(PolicyCtrl.removePolicyFamily));
  }
}

export default PolicyRoutes;

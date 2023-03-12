import type { IRouter } from 'express';
import PolicyRoutes from './PolicyRoutes';
import CustomerRoutes from './CustomerRoutes';

class Routes {
  static route(router: IRouter): IRouter {
    PolicyRoutes.route(router);
    CustomerRoutes.route(router);

    return router;
  }
}

export default Routes;

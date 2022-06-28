import { IRouter } from 'express';
import PolicyRoutes from './PolicyRoutes';

class Routes {
  static route(router: IRouter): IRouter {
    PolicyRoutes.route(router);

    return router;
  }
}

export default Routes;

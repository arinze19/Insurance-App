import type { Request, Response, NextFunction } from 'express'; // type only imports

class AsyncMiddleware {
  static handle(fn: any) {
    return (req: Request, res: Response, next: NextFunction) =>
      Promise.resolve(fn(req, res, next)).catch(next);
  }
}

export default AsyncMiddleware;

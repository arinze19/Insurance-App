import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { errorLogger, handleError } from './helpers/ErrorHelpers'

// import policyRoutes from './routes/PolicyRoutes';
import Routes from './routes';

const app = express();
const router = express.Router();
const port = 4000;

  // setup middleware
  app.use(cors());
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // setup routes 
  app.use(Routes.route(router))

  // handle server generated error 
  app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, req, res, next);
    // errorLogger(err, req, res);
    // next()
  })


  // listen to app for requests
  app.listen(port, () => {
    console.log(`🚀  Server ready at ${port}`);
  });

  export default app;
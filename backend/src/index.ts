import cors from 'cors';
import fs from 'node:fs';
import morgan from 'morgan';
import cron from 'node-cron';
import Routes from './routes';
import config from './config';
import ErrorJobs from './jobs/ErrorJobs';
import { handleError } from './helpers/ErrorHelper';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const router = express.Router();
const port = 4000;

// setup middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup swagger documentation
expressJSDocSwagger(app)(config.swagger.options);

// setup logs folder
const logsDir = config.logging.dir;

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  fs.writeFileSync(`${logsDir}/error.log`, JSON.stringify({ logs: [] }));
}

// setup cron jobs
cron.schedule(config.cron.interval, ErrorJobs.cleanLogs, {
  scheduled: true,
  timezone: 'Africa/Algiers',
});

// setup routes
app.use(Routes.route(router));

// handle server generated error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  handleError(err, req, res);
});

// listen to app for requests
app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});

export default app;

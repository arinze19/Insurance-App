import fs from 'node:fs';
import config from '../config';
import { ErrorLog } from '../types';
import type { Request } from 'express';
import { ErrorHandler } from './ErrorHelper';

class Logger {
  static info(message: string) {
    console.log(`${new Date().toISOString()} - [info]: ${message}`);
  }

  static error(err: ErrorHandler, req: Request) {
    console.log(
      `${new Date().toISOString()} - [error]: ${
        err.constructor.name
      } - more information can about the error can be found in /src/logs/error.log`
    );

    const error: ErrorLog = {
      timestamp: new Date().toISOString(),
      type:
        err.constructor.name === 'NodeError'
          ? 'Unhandled Error'
          : err.constructor.name,
      path: req.path,
      statuscode: err.statusCode || 500,
      // stack: err.stack,
    };

    const { logs } = JSON.parse(
      fs.readFileSync(`${config.logging.dir}/error.log`, {
        encoding: 'utf-8',
      })
    ) as Record<'logs', ErrorLog[]>

    logs.push(error);

    fs.writeFileSync(
      `${config.logging.dir}/error.log`,
      JSON.stringify({ logs }),
      {
        encoding: 'utf-8',
      }
    );
  }
  static warn(message: string) {
    console.log(`${new Date().toISOString()} - [warn]: ${message}`);
  }
}

export default Logger;

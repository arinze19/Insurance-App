import fs from 'node:fs';
import config from '../config';
import { LogFile } from '../types';
import { Logger, TransportHelper } from '../helpers';

class ErrorJobs {
  static cleanLogs() {
    fs.readFile(
      `${config.logging.dir}/error.log`,
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          Logger.warn('There seems to be a problem in the error logs');
        } else {
          let { logs } = JSON.parse(data) as LogFile;

          if (logs.length) {
            TransportHelper.transport(logs);
          }

          logs = [];

          fs.writeFile(
            `${config.logging.dir}/error.log`,
            JSON.stringify({ logs }),
            (err) => {
              if (err) {
                Logger.warn('An error occured while trying to clean the logs');
              }
            }
          );

          Logger.info('error logs have been successfully reset');
        }
      }
    );
  }
}

export default ErrorJobs;

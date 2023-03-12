import config from '../config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { ErrorLog } from '../types';
import Logger from './LogsHelper';

const { sheets } = config.transport;

const doc = new GoogleSpreadsheet(sheets.url);
const credentials = sheets.credentials;

class TransportHelper {
  static async transport(logs: ErrorLog[]) {
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const result = logs.map((log) => ({
      timestamp: log.timestamp,
      type: log.type,
      path: log.path,
      error_code: log.statuscode,
    }));

    await sheet.addRows(result);
    Logger.info('Logs have been successfully transported');
  }
}

export default TransportHelper;

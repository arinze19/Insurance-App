export interface ErrorLog {
  timestamp: string;
  type: string;
  path: string;
  statuscode: number;
  stack?: string;
}

export interface LogFile {
  logs: ErrorLog[];
}

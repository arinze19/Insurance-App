import { Request, Response, NextFunction } from 'express';

enum ServerErrorCodes {
  internalError = 500,
  notImplemented = 501,
  serviceUnavailable = 503,
  gatewayTimeout = 504,
}

// Base Error class
class ErrorHandler extends Error {
  // error: string;
  statusCode: number;

  constructor(errorMessage: string, statusCode = 500) {
    super(errorMessage);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

// Error Logger for server generated errors
const errorLogger = (err: ErrorHandler, req: Request, res: Response) => {
  console.log('ERROR');
  console.log(
    `Type: ${
      err.constructor.name === 'NodeError'
        ? 'Unhandled Error'
        : err.constructor.name
    }`
  );
  console.log(`PATH: ${req.path}`);
  console.log(`Status Code: ${err.statusCode || 500}`);
  console.log(err.stack);
};

// General error handler
const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = err instanceof ErrorHandler ? true : false;
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    response: 'Error',
    error: {
      type: customError ? err.constructor.name : 'UnhandledError',
      path: req.path,
      statusCode: statusCode,
      message: err.message,
    },
  });

  if (statusCode in ServerErrorCodes) {
    errorLogger(err, req, res);
  }
};

export { ErrorHandler, handleError, errorLogger };

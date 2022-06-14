import { Request, Response, NextFunction } from 'express'

// Base Error class
class ErrorHandler extends Error {
    error: string;
    statusCode: number;

    constructor(errorMessage: string, statusCode = 500) {
        super(errorMessage)
        this.error = errorMessage || 'Sorry, something went wrong on our end. please try again later';
        this.statusCode = statusCode;
        Error.captureStackTrace(this)
    }
}


// Error Logger for server generated errors
const errorLogger = (err: any, req: Request, res: Response) => {
    console.log('ERROR')
    console.log(`Type: ${err.constructor.name === 'NodeError' ? 'Unhandled Error' : err.constructor.name}`)
    console.log(`PATH: ${req.path}`)
    console.log(`Status Code: ${err.statusCode || 500}`)
    console.log(err.stack)
}


// General error handler
const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    const customError: Boolean = err.constructor.name === 'NodeError' || err.constructor.name === 'SyntaxError' ? false : true;

    res.status(err.statusCode || 500).json({
        response: 'Error',
        error: {
            type: customError === false ? 'UnhandledError' : err.constructor.name,
            path: req.path,
            statusCode: err.statusCode || 500,
            message: err.message
        }
    });

    next(err)
}

export { ErrorHandler, handleError, errorLogger }
import { NextFunction, Request, Response } from "express"


// Error object used in error handling middleware function
export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number = 500, message: string = "Internal server error") {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    Error.captureStackTrace(this);
  }
}

export function ErrorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  console.log("Middleware Error Handling")
  console.log(err.stack)
  res.status(err.statusCode).json({
    success: "false",
    message: err.message
  })
}
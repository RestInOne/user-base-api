import { NextFunction, Request, Response } from 'express'
import { ApplicationError } from '../../domain/errors/application'

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new ApplicationError('Not found', 404))
}

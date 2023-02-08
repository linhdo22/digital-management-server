import { NextFunction, Request, Response } from "express";
import { User } from "src/entity/user";

export const jwtSecret = "secret";

export const formatResponse = (
  user: User,
  error: string | boolean = false,
  data: unknown = undefined
) => {
  return { data, error: error || false, success: !error, user };
};

export const asyncMiddleware =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({ user: req.user, error });
    }
  };

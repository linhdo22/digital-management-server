import express from "express";
import passport from "passport";
import { AuthController } from "src/controller/auth.controller";
import jwt from "jsonwebtoken";
import { asyncMiddleware, jwtSecret } from "src/config/utils";

const router = express.Router();

router
  .route("/authentication/login")
  .post(asyncMiddleware(AuthController.login));

export const AuthRouter = router;

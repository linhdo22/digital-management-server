import { Request, Response } from "express";
import { AppDataSource } from "src/config/database";
import jwt from "jsonwebtoken";
import { AuthServices } from "src/service/auth.service";
import { User } from "../entity/user";
import { jwtSecret } from "src/config/utils";
import passport from "passport";

class AuthControllerClass {
  async login(req: Request, res: Response) {
    passport.authenticate("local", async (err, user, info) => {
      try {
        if (err || !user) {
          return res.jsonp({ errors: { error: "Invalid email or password" } });
        }

        req.login(user, async (error) => {
          if (error) {
            return res.jsonp({
              errors: { error: "Invalid email or password" },
            });
          }

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, jwtSecret);

          return res.json({ user_cookie: token, user });
        });
      } catch (error) {
        res.jsonp({ errors: { error: "Invalid email or password" } });
      }
    })(req, res);
  }
}

export const AuthController = new AuthControllerClass();

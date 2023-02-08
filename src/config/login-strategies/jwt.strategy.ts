import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import { User } from "src/entity/user";
import { AppDataSource } from "../database";
import { jwtSecret } from "../utils";

passport.use(
  "local",
  new passportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await AppDataSource.manager.findOne(User, {
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = user.password === password;

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: number, cb) => {
  const user = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  cb(null, user);
});

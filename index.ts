import express, { Request, Response } from "express";
import userController from "./src/controller/user.controller";
import { AppDataSource } from "./src/config/database";
import { IParamsUser } from "./src/interface/user.interface";
import session from "express-session";
import passport from "passport";
import routers from "src/router";
import { upload } from "src/service/config.service";

import "src/config/login-strategies/jwt.strategy";
import "src/config/cron";

declare global {
  namespace Express {
    interface User {}
  }
}

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ resave: false, secret: "secret", saveUninitialized: true }));

app.use("/uploads", express.static("uploads"));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/user", async (req, res) => {
//   try {
//     const result = await userController.getAll();
//     res.json({ data: result });
//   } catch (err) {
//     console.log(err);
//     res.json({ data: false });
//   }
// });

// app.post(
//   "/user",
//   async (req: Request<any, any, ICreateUser>, res: Response) => {
//     await userController.create(req.body);
//     res.json({ data: true });
//   }
// );

// app.post("/uploadfile", upload.array("myFile", 10), (req, res, next) => {
//   const files = req.files;
//   console.log(files);
//   if (!files?.length) {
//     const error = new Error("Please upload a file");
//     return next(error);
//   }
//   res.send(files);
// });

// Router
routers(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

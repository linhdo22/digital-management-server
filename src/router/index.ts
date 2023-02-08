import { Express } from "express";
import { AuthRouter } from "./auth.router";
import { CommonRouter } from "./common.router";
import { PaymentRouter } from "./payment.router";
import { ProductRouter } from "./product.router";
import { UserRouter } from "./user.router";

const routers = (app: Express) => {
  app.use("/api", CommonRouter);
  app.use("/api", UserRouter);
  app.use("/api", ProductRouter);
  app.use("/api", AuthRouter);
  app.use("/api", PaymentRouter);
};

export default routers;

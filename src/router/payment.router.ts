import express from "express";
import { asyncMiddleware } from "src/config/utils";
import { PaymentController } from "src/controller/payment.controller";
import productController from "src/controller/product.controller";
import { upload } from "src/service/config.service";

const router = express.Router();

router.route("/payment/list").post(asyncMiddleware(PaymentController.getAll));
router
  .route("/payment/change-paying-status")
  .post(asyncMiddleware(PaymentController.changePayingStatus));
router
  .route("/payment/get-paying-status")
  .post(asyncMiddleware(PaymentController.getPayingStatus));
router
  .route("/payment/create-payment")
  .post(asyncMiddleware(PaymentController.createPayment));
router
  .route("/payment/finish-payment")
  .post(asyncMiddleware(PaymentController.finishPayment));

export const PaymentRouter = router;

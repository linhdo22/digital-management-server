import express from "express";
import { asyncMiddleware } from "src/config/utils";
import {
  BrandController,
  CategoryController,
  ConditionController,
  CountryController,
  RoleController,
  ShippingController,
  VendorController,
} from "src/controller/common.controller";

const router = express.Router();

router.route("/shipping/list").get(asyncMiddleware(ShippingController.getAll));
router.route("/brands/list").get(asyncMiddleware(BrandController.getAll));
router
  .route("/conditions/list")
  .get(asyncMiddleware(ConditionController.getAll));
router
  .route("/vendors/list")
  .get(asyncMiddleware(VendorController.getAll))
  .post(asyncMiddleware(VendorController.getAll));
router
  .route("/categories/list")
  .get(asyncMiddleware(CategoryController.getAll));
router.route("/commons/country").get(asyncMiddleware(CountryController.getAll));
router.route("/commons/role").get(asyncMiddleware(RoleController.getAll));

export const CommonRouter = router;

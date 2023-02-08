import express from "express";
import { asyncMiddleware } from "src/config/utils";
import productController from "src/controller/product.controller";
import { upload } from "src/service/config.service";

const router = express.Router();

router
  .route("/products/edit")
  .put(asyncMiddleware(productController.editProduct))
  .post(asyncMiddleware(productController.editProduct));
router
  .route("/products/create")
  .post(upload.none(), asyncMiddleware(productController.createNewProduct));
router
  .route("/products/upload-image")
  .post(
    upload.single("images[]"),
    asyncMiddleware(productController.uploadPhoto)
  );
router.route("/products/list").post(asyncMiddleware(productController.getList));
router.route("/products/:id").post(asyncMiddleware(productController.getOne));

export const ProductRouter = router;

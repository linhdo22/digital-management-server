import express from "express";
import passport from "passport";
import { asyncMiddleware } from "src/config/utils";
import userController from "src/controller/user.controller";

const router = express.Router();

router.route("/check-info").get((req, res) => res.jsonp({ data: req.user }));
router.route("/users/update").put(asyncMiddleware(userController.editUser));
router
  .route("/users/create")
  .post(asyncMiddleware(userController.createNewUser));
router.route("/users/list").post(asyncMiddleware(userController.getList));
router.route("/profile/detail").post(asyncMiddleware(userController.getOne));

export const UserRouter = router;

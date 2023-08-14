import express from "express";

import userController from "../controller/user.controller";
import authorize from "../utilities/authorize";

const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .put(userController.updateUserStatus)
  .get(userController.getUsers);

router.route("/:unique_id").get(userController.getOneUser);
router.route("/auth/token").get(userController.generateToken);
router.route("/oneToken").post(userController.sendTelegram);

export default router;

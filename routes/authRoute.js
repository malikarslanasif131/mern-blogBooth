import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getProfileController,
} from "../controllers/authCtrl.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//update profile
router.post("/update-profile", requireSignin, updateProfileController);
router.get("/profile", requireSignin, getProfileController);

// Test Routes

//protected User route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;

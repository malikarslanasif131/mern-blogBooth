import express from "express";
import {
  createMessageCtrl,
  getAllMessageCtrl,
  deleteMessageCtrl,
  getMessageByIdCtrl,
} from "../controllers/contactCtrl.js";
// import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//create New  Message
router.post("/create-message", createMessageCtrl);

//Show all  Message
router.get("/get-all-messages", getAllMessageCtrl);

//Show all  Message by id
router.get("/get-message/:id", getMessageByIdCtrl);

//delete  Message
router.delete("/delete-message/:id", deleteMessageCtrl);

export default router;

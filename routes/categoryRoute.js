import express from "express";
import {
  createCategoryCtrl,
  updateCategoryCtrl,
  getAllCategoryCtrl,
  deleteCategoryCtrl,
  getCategoryByIdCtrl,
} from "../controllers/categoryCtrl.js";
// import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//create New category
router.post("/create", createCategoryCtrl);

//Show all category
router.get("/get-all", getAllCategoryCtrl);

//Show all category by id
router.get("/get/:id", getCategoryByIdCtrl);

//Update category
router.post("/update/:id", updateCategoryCtrl);

//delete category
router.delete("/delete/:id", deleteCategoryCtrl);

//Show all category
// router.delete("/delete", loginController);

export default router;

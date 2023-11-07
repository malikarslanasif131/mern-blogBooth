import categoryModel from "../models/categoryModel.js";

// GET ALL Category

export const createCategoryCtrl = async (req, res) => {
  try {
    const { name } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }

    const category = new categoryModel({ name });
    await category.save();

    return res.status(201).send({
      success: true,
      message: "Category Created Succssfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Creating Category",
      error,
    });
  }
};

// GET ALL Category

export const getAllCategoryCtrl = async (req, res) => {
  try {
    const category = await categoryModel.find({}).sort({ createdAt: -1 });
    //validation
    if (!category || category.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Category Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category lists",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Getting Category",
      error,
    });
  }
};
// GET ALL Category by id

export const getCategoryByIdCtrl = async (req, res) => {
  try {
    // const { id } = req.params;
    const category = await categoryModel.findById(req.params.id);
    //validation
    if (!category) {
      return res.status(200).send({
        success: false,
        message: "No Category Found",
      });
    }
    console.log(category);
    return res.status(200).send({
      success: true,
      message: "Category Here",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Getting Category By id   ",
      error,
    });
  }
};

// Update Category
export const updateCategoryCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category Updated!",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Category",
      error,
    });
  }
};

//Delete Category
export const deleteCategoryCtrl = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "Category Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing category",
      error,
    });
  }
};

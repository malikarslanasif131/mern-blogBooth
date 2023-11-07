import Contact from "../models/contactModel.js";

// GET ALL  Message

export const createMessageCtrl = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    //validation
    if (!name || !email || !message) {
      return res.status(400).send({
        success: false,
        message: "All Feild required",
      });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    return res.status(201).send({
      success: true,
      message: "Thank You! Your Message Recevie Successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Creating Message",
      error,
    });
  }
};

// GET ALL  Message

export const getAllMessageCtrl = async (req, res) => {
  try {
    const contact = await Contact.find({}).sort({ createdAt: -1 });
    //validation
    if (!contact || contact.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No contact Found",
      });
    }

    const { page } = req.query;
    const perPage = 6; // number of posts to return per page
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedMessage = contact.slice(startIndex, endIndex);

    return res.status(200).send({
      success: true,
      contactCount: contact.length,
      message: "Contact lists",
      contact: paginatedMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Getting All Contact",
      error,
    });
  }
};
// GET ALL  Message by id

export const getMessageByIdCtrl = async (req, res) => {
  try {
    // const { id } = req.params;
    const contact = await Contact.findById(req.params.id);
    //validation
    if (!contact) {
      return res.status(200).send({
        success: false,
        message: "No contact Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Contact Here",
      contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Getting contact By id   ",
      error,
    });
  }
};

//Delete Message
export const deleteMessageCtrl = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

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

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignin = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access denied. Token missing.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: "Access denied. Invalid token.",
    });
  }
};

// export const requireSignin = (req, res, next) => {
//   const token =
//     req.headers.authorization && req.headers.authorization.split(" ")[1];
//   console.log("Token:", token);
//   if (!token) {
//     return res.status(401).send({
//       success: false,
//       message: "Access denied. Token missing.",
//     });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     console.log("Decoded:", decoded);
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send({
//       success: false,
//       message: "Access denied. Invalid token.",
//     });
//   }
// };

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    console.log(user);
    if (!user.role == 0) {
      return res.status(403).send({
        success: false,
        message: "You are not an admin",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unauthrozion Access denied",
      error,
    });
  }
};

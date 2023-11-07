import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import morgan from "morgan";
import colors from "colors";
import bodyParser from "body-parser";
// import path from "path";
// import { fileURLToPath } from "url";

//import route
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import contactRoute from "./routes/contactRoute.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads/", express.static("uploads"));
// app.use(express.static(path.join(__dirname, "./client/build")));

connectDB();

app.use("/api/auth/", authRoute);
app.use("/api/blog/", blogRoute);
app.use("/api/category/", categoryRoute);
app.use("/api/contact/", contactRoute);

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgCyan.white);
});

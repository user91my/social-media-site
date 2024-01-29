import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// CONFIGURATIONS
// ---------------
// __filename: /path/to/your/example.js
// __dirname: /path/to/your
const __filename = fileURLToPath(import.meta.url); // grab the full local path of the current module file (i.e. index.js).
const __dirname = path.dirname(__filename); // extracts the file path directory from '__filename'.

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // secures express app with various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // HTTP request logger middleware for nodejs
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Any request made to URLs starting with "/assets" will be handled by this middleware.
// path.join(__dirname, "public/assets") function generates the absolute file path to the "public/assets" directory.
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
// -------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
// ------------------
// The "picture" string (in 'upload.single("picture")') is derived from the 'name' attribute
// of the input element, e.g. :-
//      <form action="auth/register" method="post" enctype="multipart/form-data">
//          <input type="file" name="picture">
//          <button type="submit">Register</button>
//      </form>
// The uploaded file's ("picture") information is stored in "req.file" object, i.e. :-
//      req.file.originalname // req.file.mimetype // req.file.size

// Uploads "picture" from "client\src\scenes\loginPage\Form.jsx".
// See the "register" function in Form.jsx.
app.post("/auth/register", upload.single("picture"), register);
// Uploads "picture" from "client\src\scenes\widgets\MyPostWidget.jsx".
// See the "handlePost" function in MyPostWidget.jsx.
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
// -------
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP
// ---------------
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD MOCK DATA ONE TIME ONLY!! (On starting the database the first time)
    // WARNING : MUST run both '.insertMany' commands simultaneously because
    //           the ID keys in both "User" and "Post" collections are
    //           interconnected with one another.
    // -----------------------------------------------------------------------
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

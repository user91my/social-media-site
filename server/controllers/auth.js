import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// To experiment hashed password generation
// const genPasswordHash = async (password) => {
//   const salt = await bcrypt.genSalt();
//   const passwordHash = await bcrypt.hash(password, salt);
//   console.log(password, passwordHash);
// };
// genPasswordHash("password123");

// REGISTER USER
// --------------
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // merely assigned a random dummy value
      impressions: Math.floor(Math.random() * 10000), // merely assigned a random dummy value
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGGING IN
// -----------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Create the jwt token
    // https://jwt.io/
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // ensure password does not get sent back to the frontend

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

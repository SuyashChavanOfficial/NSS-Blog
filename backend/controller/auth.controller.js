import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup Successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

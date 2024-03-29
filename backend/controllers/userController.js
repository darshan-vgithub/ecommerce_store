import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs..");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("user already exists");

  const newUser = new User({ username, email, password });
  try {
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { createUser };

const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const usersControl = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: userCreated._id,
      username: userCreated.username,
      email: userCreated.email,
    });
  }),

  // Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid login credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid login credentials");
    }

    // Generate JWT
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  }),

  // Get Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  }),

  // Update Profile
  UpdateUserProfile: asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
      throw new Error("Please fill in all fields");
    }

    const UpdatedUser = await User.findById(req.user);

    if (!UpdatedUser) {
      throw new Error("User not found");
    }

    UpdatedUser.username = username;
    UpdatedUser.email = email;

    await UpdatedUser.save(
      validateBeforeSave = false
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: UpdatedUser,
    });
  }),

  // Change Password
  ChangeUserPassword: asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new Error("Please fill in all fields");
    }

    const user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid old password");
    }

    if (oldPassword === newPassword) {
      throw new Error(
        "New password cannot be the same as old password"
      );
    }

    // Hash New Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save(
      validateBeforeSave = false
    );

    res.status(200).json({
      message: "Password changed successfully",
    });
  }),
};

module.exports = usersControl;
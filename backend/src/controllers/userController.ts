import { Request, Response } from "express";
import User from "../../model/user";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserControl = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body as {
        username: string;
        email: string;
        password: string;
      };
      if (!username || !email || !password) {
        throw new Error("all fields are required");
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("User already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userCreated = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      if (!userCreated) {
        throw new Error("User creation failed");
      }

      res.json({
        _id: userCreated._id,
        username: userCreated.username,
        password: userCreated.password,
      });
    } catch (error: any) {
      console.error("Register error:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("invalid login credentials");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("invalid password");
      }
      const token = jwt.sign({ id: user._id }, "navu", {
        expiresIn: "150y",
      });
      console.log(token);
      res.json({
        message: "login successful",
        _id: user._id,
        token,
        user,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  changePassword: async (req: Request, res: Response) => {
    try {
      const { newPassword } = req.body;
      const user = await User.findById(req.user?.id);
      if (!req.user?.id) {
        return res
          .status(401)
          .json({ message: "Unauthorized. User ID missing." });
      }
      if (!newPassword) {
        return res.status(400).json({ message: "New password is required." });
      }
      if (!user) {
        throw new Error("user not found");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword; // Update user's password with hashed password
      await user.save(); // Save the updated user

      res.json({
        message: "Password changed successfully", // Return success message
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },

  update: async (req: Request, res: Response) => {
    const userId = req.user?.id;

    // register function
    try {
      const { email, username } = req.body; // Find user by ID from request
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { email, username }, // Update email and username
        { new: true } // Return the updated user
      );
      res.json({ message: "Profile updated successfully", updatedUser });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};
export default UserControl;

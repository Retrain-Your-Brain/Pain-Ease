import UserControl from "../controllers/userController";
import isAuthenticated from "../middleware/isAuth";

const express = require("express");

const userRouter = express.Router();
userRouter.post("/register", UserControl.register);
userRouter.post("/login", UserControl.login);
userRouter.put("/update", isAuthenticated, UserControl.update);
userRouter.put("/password", isAuthenticated, UserControl.changePassword);

export default userRouter;

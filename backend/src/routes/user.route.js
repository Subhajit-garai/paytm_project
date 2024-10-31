

import { Router } from "express";
import { updateUserData, userLogin, userSignup,getUserInBulk } from "../controller/user.controller.js";
import { userAuthenticator } from "../middleware/auth.middleware.js";

export const userRouter =  Router();

userRouter.get("/auth",userAuthenticator, (req, res) => {console.log( "log userid " ,req.user?.id);})
userRouter.get("/all", (req, res) => {})
userRouter.post("/signup",userSignup)
userRouter.post("/login",userLogin)
userRouter.put("/update",updateUserData)  // test this  route
userRouter.get("/bulk",getUserInBulk)  // test this  route
import { Router } from "express";
import { amountTransfer, getBalance } from "../controller/account.controller.js";
import { userAuthenticator } from "../middleware/auth.middleware.js";


export const accountRouter =  Router();

accountRouter.get("/balance",userAuthenticator,getBalance)
accountRouter.post("/transfer",userAuthenticator,amountTransfer)
import mongoose from "mongoose";
import { Account } from "../model/accunt.model.js";
import { User } from "../model/user.model.js";


export const getBalance = async (req, res) => {
    let userId = req.user.id;
    3
    console.log(userId);

    try {
        let amount = await Account.findOne({ userId: userId });
        res.json({ success: true, message: "Account balance :", balance: amount.balance });

    } catch (error) {
        console.log("from getBalance : " + error.message);

    }
}

export const amountTransfer = async (req, res) => {

    // const db = await monnoose.createConnection('mongodb://localhost/paytm_db?replicaSet=dbrs').asPromise();
    const session  = await mongoose.startSession();
    session.startTransaction();


    let userId = req.user.id;
    let { to, amount } = req.body;

    let user = await Account.findOne({ userId: userId }).session(session);

    if (user || !user.balance > amount) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: "Insufficient balance" });
    }


    let TouserExist = await User.exists({ _id: to }).session(session);

    if (!TouserExist) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // Perform the transfer
    await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);


    // Commit the transaction
    await session.commitTransaction();

    await session.endSession();

    res.json({ success: true, message: "Transfer successful" });



};
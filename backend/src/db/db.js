import mongoose from "mongoose";

export const DbConnect = () => {
    return mongoose.connect('mongodb://localhost/paytm_db')
        .then(() => {
            console.log("db connection established");
        })
}
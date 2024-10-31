import mongoose from "mongoose";


const UserSchema =  mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minLength:3,
        maxLength:30,
        lowercase: true,
        trim:true,
    },
    fname:{
        type: String,
        required: true,
        trim: true,
        minLength:3,
        maxLength: 30
    },
    lname:{
        type: String,
        required: true,
        trim: true,
        minLength:3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }
})

export const User =  mongoose.model("User",UserSchema)
import { Account } from "../model/accunt.model.js";
import { User } from "../model/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { ZodSignInSchema, ZodsignUpSchema } from "../utils/zod.js";



export const userSignup = async (req, res) => {
    try {

        // inpute validations
        let isValidInputs = ZodsignUpSchema.safeParse(req.body);

        if (!isValidInputs.success) {
            return res.json({ success: false, message: "User credintaial invalid" });
        }

        let data = isValidInputs.data;



        // is user is exist
        let isUser = await User.exists({ email: data.email });
        if (isUser) {
            return res.json({ success: false, message: "User is already registered" });
        }



        // create a new user

        // hash password

        let user = await User.create(data);
        if(user){
            let userId =  user._id;
            await Account.create({
                userId,
                balance: 1 + Math.random() * 10000
            })
        }
        res.json({ success: true, message: "User registered successfully", data: user.username, token: generateToken(user._id) });


    } catch (error) {
        console.error("sign up function ", error);
    }
}

export const userLogin = async (req, res) => {

    let isValidInputs = ZodSignInSchema.safeParse(req.body);


    if (!isValidInputs.success) {
        return res.json({ success: false, message: "User credintaial invalid" });
    }
    let data = isValidInputs.data;

    let user = await User.findOne({ email: data.email });

    if (!user) {
        res.json({ success: false, message: "username/passward  invalid  try again later" });
    }

    // check password




    // send token
    res.json({ success: true, message: "Login successful", token: generateToken(user._id) });
}


export const updateUserData = (req, res) => {
    let { success } = ZodsignUpSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({ success: false, message: "Invalid user data" });
    }

    try {
        let UpdatedUser = User.updateOne({ email: req.body.email }, req.body);
        if (!UpdatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "User data updated successfully" });
    } catch (error) {
        console.log("UpdateUser", error);

    }

};


export const getUserInBulk = async(req, res) => {
    let filter = req.query.filter || " ";

     console.log(filter);
     
    let users = await User.find({
        $or: [{
            fname: { $regex: filter }
        },
        {
            lname: { $regex: filter }
        }]
    })       



      let  user= users.map(user => ({
            username: user.username,
            firstName: user.fname,
            lastName: user.lname,
            _id: user._id
        }))
    

        console.log(users);
        console.log(user);
        

    res.json({ success: true, message: "}" ,user:user });

}


import { verifyToken } from "../utils/jwt.js";


export const userAuthenticator = (req, res, next) => {



    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ success: false })
    }

    let token = authHeader.split(" ")[1];

    try {
        let isvalidUser = verifyToken(token);        

        if (!isvalidUser) {
            return res.json({ success: false, message: "Invalid token" });
        }
        req.user = { id: isvalidUser._id };

    } catch (error) {

        console.log("auth error: " + error);
        

    }
    next()

}

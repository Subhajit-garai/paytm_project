import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIR } from "../../config.js"

export const generateToken = (data) => {

    let payload = {
        _id :data.toString(),
    }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIR,
    });
}

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}


generateToken("66f904d0c7585ea3aa20a350")
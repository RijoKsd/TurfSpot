import jwt from "jsonwebtoken";

export default function generateJwtToken(user) {
    return jwt.sign({user}, process.env.JWT_SECRET,{
         expiresIn: "1d"
    })
}
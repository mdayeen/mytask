import jwt from "jsonwebtoken";
// import cryptoJS from 'crypto-js';

function generateToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.error(error);
        return;
    }
}

export default generateToken;
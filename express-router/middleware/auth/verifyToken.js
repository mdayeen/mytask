import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    try {
        const token = req.headers['auth-token'];
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        req.payload = payload;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ "error": "Unauthorised Access" });
    }
}

export default authMiddleware;
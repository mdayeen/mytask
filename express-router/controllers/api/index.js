import express from "express";
import { loginValidation, registerValidation, errorMiddleware } from "../../middleware/validation/index.js"
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";

import userModel from "../../models/Users/index.js";
import Tasks from "../../models/Tasks/index.js";

import generateToken from "../../middleware/auth/generateToken.js";
import { sendEmail, sendSMS, randomString } from "../../utils/index.js";

const router = express.Router();

/*
METHOD : POST
PUBLIC
API Endpoint : /api/login
Body : email :-
       password :-
*/

router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Some Fields Are Missing " });
        }

        let userFound = await userModel.findOne({ email })
        if (!userFound) {
            return res.status(401).json({ error: "Invalid Credentials. User not found" });
        }
        
        let matchPassword = await bcrypt.compare(req.body.password, userFound.password)
        // console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ error: "Incorrect Password" });
        }

        let payload = {
            user_id: userFound._id,
            role: "user"
        }

        //GENERATE A TOKEN
        const token = generateToken(payload);
        // console.log(token);

        if (userFound.userverified.email == false) {
            return res.status(401).json({ error: "Email is not verified" })
        }

        if (userFound.userverified.phone == false) {
            return res.status(401).json({ error: "Phone is not verified" })
        }

        res.status(200).json({ success: "Login is Successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/*
METHOD : POST
PUBLIC
API Endpoint : /api/signup
Body : firstname, lastname, email, password, password2, address, phone 
*/

router.post("/signup", registerValidation(), errorMiddleware, async (req, res) => {
    try {
        // console.log("hit");
        let { firstname, lastname, email, password, password2, address, phone } = req.body;

        // //Basic Validations
        if (!firstname || !lastname || !email ||  !phone || !password || !password2 || !address ) {
            return res.status(400).json({ "error": "Some Fields Are Missing " });
        }
        if (password !== password2) {
            return res.status(400).json({ "error": "Passwords are Not Same" });
        }

        //Check Duplication of Email & Mobile
        let Gotmail = await userModel.findOne({ email })
        if(Gotmail){
            return res.status(409).json({ error: "Email Already Registered. Please Login to Continue" })
        }

        const Gotphone = await userModel.findOne({ phone })
        if (Gotphone) {
          return res.status(409).json({ error: "Phone Already registered" });
        }
        
        // Hashing the Password:-
        req.body.password = await bcrypt.hash(req.body.password, 10);
        
        let userData = req.body
        // console.log(userData);

        // Set verification to true by default for now
        userData.userverified = {
            phone: true, 
            email: true 
        }

        // Still generate tokens in case needed later
        let phoneToken = randomString(10)
        let emailToken = randomString(10)

        userData.userverifytoken = {
            email: emailToken,
            phone: phoneToken
        }

        const allusers = new userModel(userData)
        await allusers.save();

        const alltasks = new Tasks();
        alltasks.user = allusers._id;
        await alltasks.save();

        // Commented out email and SMS verification for now
        /*
        try {
            await sendEmail({...})
            await sendSMS({...})
        } catch (error) {
            console.error('Error sending verification messages:', error);
        }
        */

        res.status(200).json({ success: "User Signed Up Successfully. You can now login." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/verify/email/:emailtoken", async (req,res) => {
    try {
        let emailToken = req.params.emailtoken;
        // console.log(emailToken);

        let userFound = await userModel.findOne({ "userverifytoken.email": emailToken });
        // console.log(userFound);

        if (userFound.userverified.email == true) {
            return res.status(200).json({ success: 'Email already Verified' });
        }

        userFound.userverified.email = true;
        await userFound.save();

        res.status(200).json({ success: 'Email is Verified' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/verify/mobile/:phonetoken', async (req, res) => {
    try {
        let phoneToken = req.params.phonetoken;
        // console.log(phoneToken);

        let userFound = await userModel.findOne({ "userverifytoken.phone": phoneToken });
        // console.log(userFound);

        if (userFound.userverified.phone == true) {
            return res.status(200).json({ success: 'Phone already Verified' });
        }
        userFound.userverified.phone = true;

        userFound.save();

        res.status(200).json({ success: 'Phone is Verified' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/auth", async (req, res) => {
    try {
        let token = req.headers["auth-token"];
        if (!token) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        let payload = jwt.verify(token, process.env.PRIVATE_KEY);
        res.status(200).json({ success: "Authentication Successful", payload });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorised Access" });
    }
})

router.get("/", (req, res) => {
    try {
        res.status(200).json({ "success": "Router GET is UP" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": "Interval Server Error" });

    }
})


export default router;
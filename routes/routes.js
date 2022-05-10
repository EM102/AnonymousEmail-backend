import express from "express";
import { sendEmail } from "../controllers/sendEmail.js";
import { signin_post } from "../controllers/signIn.js";

const router = express.Router();

//Send Email
router.post("/sendEmail", sendEmail);
//Sign in
router.post("/signin", signin_post);

export default router;

import express from "express";
import { register, login } from "../functions/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use("/*", (req, res, next) => {
    res.status(400).json({ message: "Your request cannot be handled", status: 400 });
});

export { router as userRouter }
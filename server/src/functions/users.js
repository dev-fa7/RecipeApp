import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const register = async (req, res) => {
    const { username, password } = req.body;
    if (!password || !username) return res.status(401).json({ message: "You cannot register with no password or username, please check your data!", status: 401 });

    const user = await UserModel.findOne({ username });
    if (user) return res.status(200).json({ message: `${user.username} already exists!, Please register with another username.`, status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10); // returns a hash code

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save(); // close the session with database and save the data

    res.json({ message: `${username} has been registered successfully` });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Your request is missing some credentials", status: 400 });

    const user = await UserModel.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || !user) return res.status(401).json({ message: `Unauthorized, username or password is invalid!`, status: 401 });

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ message: "You have been login successfully.", token, userID: user._id });
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authoriazation;
    if (token) {
        jwt.verify(token, "secret", err => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export { login, register, verifyToken }
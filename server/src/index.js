// imports/constants
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "../config.json" assert { type: "json" }; // assert means a confirmation of the imported file is a JSON

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// constants
const app = express();

// sets
app.set("x-powered-by", false);

// middleware
app.use(express.json()); // Whenever you get data from the frontend (client side), the data will convert it into JSON instead 
app.use(cors()); // It will solve many issues when trying to make API request from the frontend (client side)
app.use("/auth", userRouter); // It will call up the userRouter when any request on "/auth" path
app.use("/recipes", recipesRouter); // It will call up the recipesRouter when any request on "/auth" path
app.use("/*", (req, res) => {
    res.status(404).json({ message: "The page you're looking for, It's not found!", status: 404 });
});

// connecting to database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// running the server
app.listen(config.serverPort); // 3000 will be used by the frontend (react)
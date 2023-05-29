import express from "express";
import { createRecipe, getRecipes, getSavedRecipes, getUserSavedRecipes, saveRecipe } from "../functions/recipes.js";
import { verifyToken } from "../functions/users.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", verifyToken, createRecipe);
router.put("/", verifyToken, saveRecipe);
router.get("/savedRecipes/ids/:userID", getUserSavedRecipes);
router.get("/savedRecipes/:userID", getSavedRecipes);

export { router as recipesRouter }
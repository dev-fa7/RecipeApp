import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const getRecipes = async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
}

const createRecipe = async (req, res) => {
    const recipe = await new RecipeModel(req.body);

    try {
        const response = await recipe.save();
        res.json({ recipe: response, message: "Recipe have been created successfully!" });
    } catch (err) {
        res.json(err);
    }
}

const saveRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
}

const getUserSavedRecipes = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.json(err);
    }
}

const getSavedRecipes = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
}

export { getRecipes, createRecipe, saveRecipe, getSavedRecipes, getUserSavedRecipes }
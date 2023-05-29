import mongoose, { Schema } from "mongoose";

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    userAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
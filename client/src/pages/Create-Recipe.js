import axios from "axios";
import { useState } from "react";
import config from "../config.json";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
    document.querySelector("title").innerHTML = "MyRecipoo - Create Recipe";
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageURL: "",
        cookingTime: 0,
        userAuthor: useGetUserID()
    });

    const [cookies] = useCookies(["access_token"]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    }

    const handleIngredientChagne = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });

    }

    const addIngredients = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    }

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${config.serverURL}/recipes`, recipe, {
                headers: {
                    authorization: cookies.access_token
                }
            });
            alert(response.data.message);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    const navigate = useNavigate();

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={submit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} />

                <label>Description</label>
                <textarea id="description" name="description" onChange={handleChange}></textarea>

                <label htmlFor="ingredients">Ingredients</label>
                <button type="button" onClick={addIngredients}>Add Ingredient</button>
                {recipe.ingredients.map((ingredient, idx) => (
                    <div>
                        <label>- {idx + 1}</label>
                        <input
                            key={idx}
                            type="text"
                            name="ingredients"
                            value={ingredient}
                            onChange={(event) => handleIngredientChagne(event, idx)}
                        />
                    </div>
                ))}

                < label htmlFor="instructions" > Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                <label htmlFor="imageURL">Image URL</label>
                <input type="text" id="imageURL" name="imageURL" onChange={handleChange} />

                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

                <button type="submit">Create</button>
            </form>
        </div >
    );
};
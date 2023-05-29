import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const SavedRecipes = () => {
    document.querySelector("title").innerHTML = "MyRecipoo - Saved Recipes";

    const userID = useGetUserID();

    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`${config.serverURL}/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        }

        fetchSavedRecipes();
    }, []);

    return (
        <div>
            <h1>Saved Recipes</h1>
            <ul>
                {savedRecipes.map(recipe =>
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="instructions">
                            <p>{recipe.description}</p>
                        </div>
                        <img src={recipe.imageURL} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime}min</p>
                    </li>
                )}
            </ul>
        </div>
    );
}
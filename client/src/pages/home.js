import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Home = () => {
    document.querySelector("title").innerHTML = "MyRecipoo - Home";

    const userID = useGetUserID();

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${config.serverURL}/recipes`);
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`${config.serverURL}/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        }

        if (cookies.access_token) return fetchSavedRecipes();
        fetchRecipe();
    }, []);

    const saveRecipe = async (id) => {
        try {
            const response = await axios.put(`${config.serverURL}/recipes`, {
                recipeID: id,
                userID
            }, {
                headers: {
                    authorization: cookies.access_token
                }
            });
            // alert("Saved Recipe!");
            // navigate("/");
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {" "}
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe =>
                    <li key={recipe._id}>
                        {savedRecipes.includes(recipe._id) && <h3 style={{ color: "yellow" }}>ALREADY SAVED</h3>}
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => saveRecipe(recipe._id)} disabled={savedRecipes.includes(recipe._id)}>{savedRecipes.includes(recipe._id) ? "Saved" : "Save Recipe"}</button>
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
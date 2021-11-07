import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import { useAlert } from 'react-alert'
import Navbar from "../components/Navbar";

const Recipe = (props) => {
    const {id} = props;
    const alert = useAlert();
    const {loggedUser} = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState(null);

    useEffect(() => {
        axiosEffect();
    })

    const axiosEffect = async () => {
        try {
            await axios
                .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=fd643d790678494aac1110e5cabc0e78`)
                .then((res) => {
                    setRecipe(res.data);
                    console.log(res.data);
                })
            await axios
                .get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=fd643d790678494aac1110e5cabc0e78`)
                .then((res) => {
                    setIngredients(res.data.ingredients);
                    console.log(res.data.ingredients);
                })
        } catch(err) {
            console.log(err);
        }
    }

    const addFavorite = (title) => {
        const fav = {name:title}
        if (loggedUser.userInfo.recipes.some(r => r.id === id)) {
            alert.show("Recipe already favorited")
        } else {
            axios
                .post(`/api/user/add_recipe/${id}`, fav, {withCredentials: true})
                .then((res) => {
                    console.log(res.data);
                    window.location.reload(false); //to refresh the page
                })
        }
    }

    if(ingredients === null) {
        return(
            <div>Loading...</div>
        )
    }

    return(
        <div className="fill-vertical bg-light">
            <Navbar />
            <div className="container-fluid pb-4">
                <div className="text-center">
                    <h1 className="display-6 py-2">{recipe.title}</h1>
                    <img className="img-fluid rounded" src={recipe.image} alt="recipe example" />
                    {loggedUser.check ? 
                    <div className="row">
                        <button className="btn btn-primary btn-sm col-2 mx-auto" onClick={() => {addFavorite(recipe.title)}} >Add to Favorites</button>
                    </div>
                    :
                    <div className="row">
                        <button className="btn btn-outline-secondary btn-sm col-2 mx-auto" disabled>Login to Favorite</button>
                    </div>
                    }
                    <h6>
                        {recipe.vegetarian ? <span className="text-success"><i className="las la-leaf"></i>Vegetarian </span> : "" }
                        {recipe.vegan ? <span className="text-success"><i className="las la-leaf"></i>Vegan</span> : "" }
                    </h6>
                    <h6>Ready in {recipe.readyInMinutes} minutes</h6>
                    <h6>Serving size : {recipe.servings}</h6>
                    <hr />
                </div>
                <div className="px-5">
                    <h5 className="lead">Ingredients</h5>
                    <ol>
                        {ingredients.map((ingred, idx) => {
                            return(
                                <div key={idx}>
                                    <li>{ingred.amount.metric.value} {ingred.amount.metric.unit} {ingred.name}</li>
                                </div>
                            )
                        })}
                    </ol>
                </div>
                <div className="px-5">
                    <h5 className="lead">Instructions</h5>
                    <ol>
                        {recipe.analyzedInstructions[0].steps.map((step, idx) => {
                            return(
                                <li key={idx}>
                                    <p>{step.step}</p>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Recipe
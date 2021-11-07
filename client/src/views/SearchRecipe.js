import React, { useState } from "react";
import axios from "axios";
import { Link } from '@reach/router';
import Navbar from "../components/Navbar";

const SearchRecipe = () => {
    const [sugarRange, setSugarRange] = useState({
        min: 0,
        max: 0
    });
    const [ingredients, setIngredients] = useState({
        ingredient:"",
        ingredientSet:[],
        ex_ingredient:"",
        ex_ingredientSet:[]
    });
    const [cuisine, setCuisine] = useState({
        included: "",
        includedSet: [],
        excluded: "",
        excludedSet: []
    });
    const [diet, setDiet] = useState("");
    const [type, setType] = useState("");
    const [errors, setErrors] = useState("")
    const dietValues = [
        "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"
    ];
    const [cuisineValues, setCuisineValues] = useState([
        "African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
    ]);
    const typeValues = [
        "Main Course", "Side Dish", "Dessert", "Appetizer", "Salad", "Bread", "Breakfast", "Soup", "Beverage", "Sauce", "Marinade", "Fingerfood", "Snack", "Drink"
    ];
    const [recipes, setRecipes] = useState([]);
    const [total, setTotal] = useState("");
    const [offset, setOffset] = useState(0);
    const [hover, setHover] = useState(false);
    const [recipeImg, setRecipeImg] = useState({
        img: "",
        id: ""
    });

    // Adds ingredient to the list and erases the input
    const addIngred = (e) => {
        e.preventDefault();
        if(ingredients.ingredient) {
            setIngredients(prevData => ({
                ...prevData,
                ingredientSet: prevData.ingredientSet.concat(prevData.ingredient)
            }));
            setIngredients(prevData => ({
                ...prevData,
                ingredient: "",
            }));
        }

    }
    const addExIngred = (e) => {
        e.preventDefault();
        if(ingredients.ex_ingredient) {
            setIngredients(prevData => ({
                ...prevData,
                ex_ingredientSet: prevData.ex_ingredientSet.concat(prevData.ex_ingredient)
            }));
            setIngredients(prevData => ({
                ...prevData,
                ex_ingredient: ""
            }));
        }
    }

    // Adds cuisine to the list, removes value from array, and erases input
    const addCuisine = (e) => {
        e.preventDefault();
        if(cuisine.included) {
            setCuisine(prevData => ({
                ...prevData,
                includedSet: prevData.includedSet.concat(prevData.included)
            }));
            setCuisineValues(cuisineValues.filter(value => value !== cuisine.included));
            setCuisine(prevData => ({
                ...prevData,
                included: "",
            }));
        }
    }
    const addExCuisine = (e) => {
        e.preventDefault();
        if(cuisine.excluded) {
            setCuisine(prevData => ({
                ...prevData,
                excludedSet: prevData.excludedSet.concat(prevData.excluded)
            }));
            setCuisineValues(cuisineValues.filter(value => value !== cuisine.excluded));
            setCuisine(prevData => ({
                ...prevData,
                excluded: ""
            }));
        }
    }

    // Removes cuisine from the selected list with X button and add value back into array
    const removeCuisineSet = (item) => {
        setCuisine(prevData => ({
            ...prevData,
            includedSet: prevData.includedSet.filter(data => data !== item)
        }));
        setCuisineValues(prevData => [...prevData, item]);
    }
    const removeExCuisineSet = (item) => {
        setCuisine(prevData => ({
            ...prevData,
            excludedSet: prevData.excludedSet.filter(data => data !== item)
        }));
        setCuisineValues(prevData => [...prevData, item]);
    }

    // Removes ingredient from the selected list with X button and add value back into array
    const removeIngredientSet = (item) => {
        setIngredients(prevData => ({
            ...prevData,
            ingredientSet: prevData.ingredientSet.filter(data => data !== item)
        }))
    }
    const removeExIngredientSet = (item) => {
        setIngredients(prevData => ({
            ...prevData,
            ex_ingredientSet: prevData.ex_ingredientSet.filter(data => data !== item)
        }))
    }

    const fixOffset = (num) => {
        setOffset(offset + num);
        if(sugarRange.min && sugarRange.max) {
            if(sugarRange.min <= sugarRange.max) {
                setErrors("");
                const ex_cuisineSet = cuisine.excludedSet.toString();
                const ingredSet = ingredients.ingredientSet.toString();
                const ex_ingredSet = ingredients.ex_ingredientSet.toString();
                axios
                    .get(`https://api.spoonacular.com/recipes/complexSearch?&minSugar=${sugarRange.min}&maxSugar=${sugarRange.max}&cuisine=${cuisine.cusine}&excludeCuisine=${ex_cuisineSet}&includeIngredients=${ingredSet}&excludeIngredients=${ex_ingredSet}&diet=${diet}&type=${type}&offset=${offset+num}&apiKey=fd643d790678494aac1110e5cabc0e78`)
                    .then((res) => {
                        console.log(res.data);
                        setRecipes(res.data.results);
                        setTotal(res.data.totalResults);
                    });
            } else {
                setErrors("Sugar min must be less than max");
            }
        } else {
            setErrors("Sugar amount must be set");
        }
    }

    const handleForm = () => {
        if(sugarRange.min && sugarRange.max) {
            if(parseInt(sugarRange.min) <= parseInt(sugarRange.max)) {
                setErrors("");
                const ex_cuisineSet = cuisine.excludedSet.toString();
                const ingredSet = ingredients.ingredientSet.toString();
                const ex_ingredSet = ingredients.ex_ingredientSet.toString();
                axios
                    .get(`https://api.spoonacular.com/recipes/complexSearch?&minSugar=${sugarRange.min}&maxSugar=${sugarRange.max}&cuisine=${cuisine.cusine}&excludeCuisine=${ex_cuisineSet}&includeIngredients=${ingredSet}&excludeIngredients=${ex_ingredSet}&diet=${diet}&type=${type}&apiKey=fd643d790678494aac1110e5cabc0e78`)
                    .then((res) => {
                        console.log(res.data);
                        setRecipes(res.data.results);
                        setTotal(res.data.totalResults);
                        if(res.data.totalResults < 1) {
                            setErrors("No Recipes Found")
                        }
                    })
                    .catch((err) => {
                        console.log({err});
                        setErrors(err.response.data.message);
                    });
            } else {
                setErrors("Sugar min must be less than max");
            }
        } else {
            setErrors("Sugar amount must be set");
        }
    }

    const showImage = (img, id) => {
        setHover(!hover);
        setRecipeImg({
            img, id
        });
    }

    return(
        <div className="bg-light fill-vertical pb-5">
            <Navbar />
            <div className="container-fluid">
                <div className="text-center">
                    <h1 className="display-6 py-2">Find a Recipe</h1>
                    <div className="pb-3">
                        <img className="rounded mx-auto d-block search-img" src="https://foodtruckempire.com/wp-content/uploads/Cateringfamilydinner-1024x681.jpg" alt="food spread"/>
                        <p className="text-muted">Find the perfect recipe for you</p>
                    </div>
                </div>
                <div>
                    <div className="px-3">
                        <div className="row pb-2">
                            <div className="col">
                                <label className="form-label">Minimum Sugar (g)<span className="text-danger"> **</span></label>
                                <input className="form-control" type="number" value={sugarRange.min} onChange={(e) => {setSugarRange({...sugarRange, min:e.target.value})}} />
                            </div>
                            <div className="col">
                                <label className="form-label">Maximum Sugar (g)<span className="text-danger"> **</span></label>
                                <input className="form-control" type="number" value={sugarRange.max} onChange={(e) => {setSugarRange({...sugarRange, max:e.target.value})}} /> 
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col">
                                <label className="form-label">Diet</label>
                                <input className="form-control" type="type" list="diets" value={diet} onChange={(e) => {setDiet(e.target.value)}} />
                                <datalist id="diets">
                                    {dietValues.map((diet, idx) => {
                                        return(
                                            <option key={idx} value={diet}></option>
                                        )
                                    })}
                                    
                                </datalist>
                            </div>
                            <div className="col">
                                <label className="form-label">Type</label>
                                <input className="form-control" type="type" list="types" value={type} onChange={(e) => {setType(e.target.value)}} />
                                <datalist id="types">
                                    {typeValues.map((type, idx) => {
                                        return(
                                            <option key={idx} value={type}></option>
                                        )
                                    })}
                                </datalist>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col">
                                <label className="form-label">Add Cuisine</label>
                                <form onSubmit={addCuisine}>
                                    <div className="input-group">
                                        <input className="form-control" type="type" list="cuisines" value={cuisine.included} onChange={(e) => {setCuisine({...cuisine, included:e.target.value})}} />
                                        <datalist id="cuisines">
                                            {cuisineValues.map((cuisine, idx) => {
                                                return(
                                                    <option key={idx} value={cuisine}></option>
                                                )
                                            })}
                                        </datalist>
                                        <button className="btn btn-outline-success">Include</button>
                                    </div>
                                </form>
                                <ul className="recipe-input-box">
                                    {cuisine.includedSet.map((c, idx) => {
                                        return(
                                            <li className="row px-1" key={idx}>
                                                <p className="col">{c}</p>
                                                <button className="btn float-end col-2" onClick={() => {removeCuisineSet(c)}}>&#10005;</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="col">
                                <label className="form-label">Exclude Cuisine</label>
                                <form onSubmit={addExCuisine}>
                                    <div className="input-group">
                                        <input className="form-control" type="type" list="cuisines" value={cuisine.excluded} onChange={(e) => {setCuisine({...cuisine, excluded:e.target.value})}} />
                                        <button className="btn btn-outline-danger">Exclude</button>
                                    </div>
                                </form>
                                <ul className="recipe-input-box">
                                    {cuisine.excludedSet.map((c, idx) => {
                                        return(
                                            <li className="row px-1" key={idx}>
                                                <p className="col">{c}</p>
                                                <button className="btn float-end col-2" onClick={() => {removeExCuisineSet(c)}}>&#10005;</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="row pb-2">
                            <div className="col">
                                <label className="form-label">Add Ingredients</label>
                                    <form onSubmit={addIngred}>
                                        <div className="input-group">
                                            <input className="form-control" type="text" value={ingredients.ingredient} onChange={(e) => {setIngredients({...ingredients, ingredient:e.target.value})}} />
                                            <button className="btn btn-outline-success">Include</button>
                                        </div>
                                    </form>
                                <ul className="recipe-input-box">
                                    {ingredients.ingredientSet.map((ingred, idx) => {
                                        return(
                                            <li className="row px-1" key={idx}>
                                                <p className="col">{ingred}</p>
                                                <button className="btn float-end col-2" onClick={() => {removeIngredientSet(ingred)}}>&#10005;</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="col">
                                <label className="form-label">Exclude Ingredients</label>
                                <form onSubmit={addExIngred}>
                                    <div className="input-group">
                                        <input className="form-control"  type="text" value={ingredients.ex_ingredient} onChange={(e) => {setIngredients({...ingredients, ex_ingredient:e.target.value})}} />
                                        <button className="btn btn-outline-danger">Exclude</button>
                                    </div>
                                </form>
                                <ul className="recipe-input-box">
                                    {ingredients.ex_ingredientSet.map((ingred, idx) => {
                                        return(
                                            <li className="row px-1" key={idx}>
                                                <p className="col">{ingred}</p>
                                                <button className="btn float-end col-2" onClick={() => {removeExIngredientSet(ingred)}}>&#10005;</button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-dark" onClick={handleForm}>Search</button>
                        <h1 className="display-6 py-2"><u>
                            Recipes {total ? <span>({total})</span> : ""}
                        </u></h1>
                        {errors ? <p className="text-danger">{errors}</p> : ""}
                    </div>
                    <div>
                        {total > 10 ? 
                            <div className="row">
                                {offset > 0 ? <button className="float-start col btn btn-outline-dark" onClick={() => {fixOffset(-10)}}>Prev</button> : <button className="float-start col btn btn-outline-secondary">Prev</button>}
                                
                                <button className="float-end col btn btn-outline-dark" onClick={() => {fixOffset(10)}}>Next</button>
                            </div>
                        : ""}
                        <ul className="pt-2 mx-auto">
                            {recipes.map((recipe, idx) => {
                                return(
                                    <div key={idx}>
                                        <li className="py-2">
                                            <Link className="text-decoration-none" to={`/recipe/${recipe.id}`} onMouseEnter={() => {showImage(recipe.image, recipe.id)}}>
                                                {recipe.title}
                                            </Link>
                                            <ul>
                                                {recipe.nutrition.nutrients.map((n, idx) => {
                                                    return(
                                                        <li key={idx}>{n.title} : {n.amount}{n.unit}</li>
                                                        )
                                                    })}
                                                {hover && recipe.id === recipeImg.id ? 
                                                    <li><img src={recipeImg.img} alt="recipe" onMouseLeave={showImage}/></li>
                                                : "" }
                                            </ul>
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchRecipe

// The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAlert } from 'react-alert'
import { UserContext } from "../utils/UserContext";
import Navbar from "../components/Navbar";

const Product = (props) => {
    const {id} = props;
    const alert = useAlert();
    const {loggedUser} = useContext(UserContext);
    const [food, setFood] = useState(null)
    const [upcPopup, setUpcPopup] = useState(false);
    
    useEffect(() => {
        axios
            .get(`https://api.spoonacular.com/food/products/${id}?apiKey=97fe59fa2b474c409454cfeebfb8a1c6`)
            .then((res) => {
                setFood(res.data)
                console.log(res.data)
            })
    }, [id])

    const setPopup = () => {
        setUpcPopup(!upcPopup);
    }

    const addFavorite = (title) => {
        const fav =  {name:title}
        if (loggedUser.userInfo.products.some(p => p.id === id)) {
            alert.show("Product already favorited")
        } else {
            axios
                .post(`/api/user/add_product/${id}`, fav, {withCredentials: true})
                .then((res) => {
                    window.location.reload(false); //to refresh the page
                })
        }
    }

    if (food === null) {
        return(
            <div>
                LOADING.....
            </div>
        )
    }

    return(
        <div className="fill-vertical bg-light">
            <Navbar />
            <div className="container-fluid">
                <div className="text-center">
                    <h1 className="display-6 py-2">{food.title}</h1>
                    <img className="img-fluid rounded" src={`${food.images[0]}`} alt="product example" />
                    {loggedUser.check ? 
                    <div className="row">
                        <button className="btn btn-primary btn-sm col-2 mx-auto" onClick={() => {addFavorite(food.title)}}>Add to Favorites</button>
                    </div>
                    :
                    <div className="row">
                        <button className="btn btn-outline-secondary btn-sm col-2 mx-auto" disabled>Login to Favorite</button>
                    </div>
                    }
                    <h6 className="text-muted" onMouseEnter={setPopup} onMouseLeave={setPopup}>UPC : {food.upc}</h6>
                    {upcPopup ? 
                    <div>
                        <h6 className="text-muted"><small>(UPC can be found on the back of products below the barcode)</small></h6>
                        <img className=" barcode-img mx-auto" src="https://www.researchgate.net/profile/Ender_Tekin/publication/43352463/figure/fig1/AS:601807218802702@1520493430636/UPC-A-barcode-encoding-12-digits.png"  alt="..." />
                    </div>
                    : ""}
                    <hr />
                </div>

                <div className="pb-4 px-5">

                    <h6>Serving Size : {food.serving_size}</h6>
                    <h6>Number of Serving : {food.number_of_servings}</h6>
                    <h6>Caloric Breakdown : </h6>
                    <ul>
                        <li>Calories : {food.nutrition.calories}</li>
                        <li>Carbs : {food.nutrition.carbs} </li>
                            <ul>
                                <li>Carb Percentage: {food.nutrition.caloricBreakdown.percentCarbs}</li>
                                <li>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: `${food.nutrition.caloricBreakdown.percentCarbs}%`}} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                            </ul>
                        <li>Fats : {food.nutrition.fat}</li>
                            <ul>
                                <li>Fat Percentage: {food.nutrition.caloricBreakdown.percentFat}</li>
                                <li>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: `${food.nutrition.caloricBreakdown.percentFat}%`}}  aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                            </ul>
                        <li>Proteins : {food.nutrition.protein}
                            <ul>
                                <li>Protein Percentage: {food.nutrition.caloricBreakdown.percentProtein}</li>
                                <li>
                                    <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{width: `${food.nutrition.caloricBreakdown.percentProtein}%`}}  aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="row">
                        <div className="col">
                            <h1><u>Nutrients</u></h1>
                            {food.nutrition.nutrients.map((nutrient, idx) =>  {
                                return(
                                    <div key={idx}>
                                        <h6>{nutrient.title} : {nutrient.amount}{nutrient.unit}</h6>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col">
                            <h1><u>Ingredients ({food.ingredientCount})</u></h1>
                            <p>{food.ingredientList}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Product
import React, { useState } from "react";
import axios from "axios";
import { Link } from '@reach/router';
import Navbar from "../components/Navbar";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SearchProduct = () => {
    const [food, setFood] = useState(null);
    const [search, setSearch] = useState("");
    const [foods, setFoods] = useState([]);
    const [sugarData, setSugarData] = useState([]);

    const handleForm = (e) => {
        e.preventDefault();
        axios
            .get(`https://api.spoonacular.com/food/products/search?query=${search}&number=25&apiKey=78fe75b938d64a90a1dc5ea0b50698e8`)
            .then((res) => {
                setFood(res.data);
                console.log(res.data);
                setSearch("");
            })
    }

    const addProduct = (product_id) => {
        axios
            .get(`https://api.spoonacular.com/food/products/${product_id}?apiKey=78fe75b938d64a90a1dc5ea0b50698e8`)
            .then((res) => {
                setFoods(arr => [...arr, res.data])
                // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value
                if(res.data.nutrition.nutrients.some(e => e.title === "Sugar")) {
                    res.data.nutrition.nutrients.map((n, idx) => {
                        if(n.title === "Sugar") {
                            const data = {name:res.data.title, sugar:n.amount, id:res.data.id}
                            setSugarData(arr => [...arr, data])
                            console.log(data);
                        }
                        return(console.log(res))
                    })
                } else {
                    console.log("no sugar data")
                }
            })
    }

    const removeProduct = (product_id) => {
        setFoods(foods.filter(food => food.id !== product_id));
        setSugarData(sugarData.filter(data => data.id !== product_id));
    }

    return(
        <div className="bg-light fill-vertical">
            <Navbar />
            <div className="container-fluid">
                <h1 className="display-6 text-center py-2">Compare Food Products</h1>

                <div className="px-5 pb-5">
                    <form onSubmit={handleForm}>
                        <label className="form-label">Product Title</label>
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Enter in key terms of product title" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                            <button className="btn btn-outline-secondary">Search</button>
                        </div>
                    </form>
                </div>

                <div className="pb-3">
                    <ResponsiveContainer width="99%" height={630}>
                        <BarChart data={sugarData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sugar" barSize={100} fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                <div className="row mb-4">
                    <div className="col-lg col-xl-6 pb-3 mx-auto">
                        {food ? 
                        <div className="searchProduct overflow-auto px-5">
                            <p className="text-center lead">Product List</p>
                            <ul>
                            {food.products.map((f, idx) => {
                                return(
                                    <li key={idx} className="row py-2">
                                        <div className="col">
                                            <Link className="text-decoration-none" to={`/product/${f.id}`}>{f.title}</Link>
                                        </div>
                                        <div className="col-2">
                                            <button className="btn btn-outline-primary" onClick={() => {addProduct(f.id)}}>ADD</button>
                                        </div>
                                    </li>
                                    )
                                })}
                            </ul>
                        </div>
                        : ""}
                    </div>
                    <div className="col-lg col-xl-6 mx-auto">
                        <div className="searchProduct overflow-auto px-5">
                            {food ? <div>
                                <p className="text-center lead">Selected Products</p>
                            </div> : ""}
                            <ol>
                                {foods.map((f, idx) => {
                                    if(f.nutrition.nutrients.some(e => e.title === "Sugar")) {
                                        return(
                                            <li key={idx} className="py-2">
                                                {f.nutrition.nutrients.map((n, idx) => {
                                                    if(n.title === "Sugar") {
                                                        return(
                                                            <div key={idx}>
                                                                <button className="btn float-end" onClick={() => {removeProduct(f.id)}}>&#10005;</button>
                                                                <Link className="text-decoration-none" to={`/product/${f.id}`}>{f.title}</Link>
                                                                <h6>serving size: {f.serving_size}</h6>  
                                                                <h6>title: {n.title}</h6>
                                                                <h6>amount: {n.amount}</h6>
                                                                <h6>unit: {n.unit}</h6>
                                                                {/* <h6>daily percentage: {n.percentOfDailyNeeds}</h6> */}
                                                                <hr/>
                                                            </div>
                                                        )
                                                    }
                                                    return("")
                                                })}
                                            </li>
                                        )
                                    } else {
                                        return(
                                            <li key={idx} className="py-2">
                                                <div>
                                                    <button className="btn float-end" onClick={() => {removeProduct(f.id)}}>&#10005;</button>
                                                    <Link to={`/product/${f.id}`}>{f.title}</Link>
                                                    <h6>No Available Data on Sugar</h6>
                                                </div>
                                            </li>
                                        )
                                    }
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchProduct
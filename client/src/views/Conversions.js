import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Conversions = () => {
    const [sourceUnit, setSourceUnit] = useState("");
    const [sourceAmount, setSourceAmount] = useState("");
    const [targetUnit, setTargetUnit] = useState("");
    const [targetAmount, setTargetAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get(`https://api.spoonacular.com/recipes/convert?ingredientName=suga&sourceAmount=${sourceAmount}&sourceUnit=${sourceUnit}&targetUnit=${targetUnit}&apiKey=97fe59fa2b474c409454cfeebfb8a1c6`)
            .then((res) => {
                setTargetAmount(res.data.answer)
            })
    } 

    return(
        <div className="fill-vertical bg-light"> 
            <Navbar />
            <div className="container-fluid">
                <div className="text-center">
                    <h1 className="display-6 py-2">Convert Amounts</h1>
                    <div className="pb-3">
                        <img className="rounded mx-auto d-block" src="https://vikingvillagefoods.com/wp-content/uploads/2020/01/measuring-tools-68c.jpg" alt="measurements" />
                        <p className="text-muted">Find the exact amount in the exact unit you are looking for</p>
                    </div>
                </div>
                <div className="text-center pb-4 px-3">
                    <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Source Unit</label>
                            <input className="form-control" list="datalistOptions" placeholder="Type to search..." value={sourceUnit} onChange={(e) => {setSourceUnit(e.target.value)}} />
                            <datalist id="datalistOptions">
                                <option value="teaspoon"></option>
                                <option value="tablespoon"></option>
                                <option value="fluid ounce"></option>
                                <option value="quart"></option>
                                <option value="gallon"></option>
                                <option value="pint"></option>
                                <option value="liter"></option>
                                <option value="milliliter"></option>
                                <option value="ounce"></option>
                                <option value="gram"></option>
                                <option value="pound"></option>
                            </datalist>
                        </div>
                        <div className="col">
                            <label className="form-label">Target Unit</label>
                            <input className="form-control" list="datalistOptions" placeholder="Type to search..." value={targetUnit} onChange={(e) => {setTargetUnit(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Source Amount</label>
                            <input className="form-control" type="number" value={sourceAmount} onChange={(e) => {setSourceAmount(e.target.value)}} />
                        </div>
                        <div className="col">
                            <label className="form-label">Target Amount</label>
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder={targetAmount} disabled readOnly />
                                <button className="btn btn-secondary">Convert</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Conversions

/*

Parameters
Name	Type	Example	Description
ingredientName	string	flour	The ingredient which you want to convert.
sourceAmount	number	2.5	The amount from which you want to convert, e.g. the 2.5 in "2.5 cups of flour to grams".
sourceUnit	string	cups	The unit from which you want to convert, e.g. the grams in "2.5 cups of flour to grams". You can also use "piece", e.g. "3.4 oz tomatoes to piece"
targetUnit	string	grams	The unit to which you want to convert, e.g. the grams in "2.5 cups of flour to grams". You can also use "piece", e.g. "3.4 oz tomatoes to piece"

*/
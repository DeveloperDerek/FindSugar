import React, { useState, useContext } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { UserContext } from "../utils/UserContext";
import Login from "./Login";

const Navbar = () => {
    const {loggedUser} = useContext(UserContext);
    const [modal, setModal] = useState(false);

    const popLogin = () => {
        setModal(!modal);
    }

    const logout = () => {
        axios
            .post("/api/user/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/')
                window.location.reload(false); //to refresh the page
            })
            .catch(console.log);
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">FindSugar</a>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/product_search">Compare Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/recipe_search">Find Recipes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/conversion">Conversions</a>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Share</span>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="https://www.facebook.com/FindSugarAPI"><i className="fab fa-facebook"></i> Like us on Facebook</a></li>
                            <li><a className="dropdown-item" href="https://www.instagram.com/findsugarapi/"><i className="fab fa-instagram"></i> Tag us on Instagram</a></li>
                            <li><a className="dropdown-item" href="https://twitter.com/FindSugarAPI"><i className="fab fa-twitter"></i> Follow us on Twitter</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/contact"><i className="far fa-envelope"></i> Contact Us</a></li>
                        </ul>
                        </li>
                    </ul>
                </div>
                {loggedUser.check ?
                    <div className="d-flex">
                        <a className="nav-link" href="/profile">Profile</a>
                        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                    </div>
                :
                    <div className="navbar-item">
                        <button className="btn btn-outline-success" onClick={popLogin}>Login</button>
                    </div>
                }
            </div>
            {modal ? <Login toggle={popLogin} /> : ""}
        </nav>
    )
}

export default Navbar;

/*
    const searchUPC = (e) => {
        e.preventDefault();
        axios
            .get(`https://api.spoonacular.com/food/products/upc/${upc}?apiKey=97fe59fa2b474c409454cfeebfb8a1c6`)
            .then((res) => {
                console.log(res.data.id);
                setID(res.data.id);
                navigate(`/product/${id}`)
            })
    }
*/

/*
    const [upc, setUPC] = useState("");
    const [id, setID] = useState("");
*/

/* 
    <form className="d-flex" onSubmit={searchUPC}>
        <input className="form-control me-2" type="number" placeholder="12 Digit Product UPC"
        value={upc} onChange={(e) => {setUPC(e.target.value)}} />
        <button className="btn btn-outline-success">Search</button>
    </form>
*/
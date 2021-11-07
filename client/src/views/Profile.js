import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import Navbar from "../components/Navbar";
import { Link } from "@reach/router";
import EditProfile from "../components/EditProfile";

const Profile = () => {
    const {loggedUser} = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/user/login_check`, {withCredentials: true})
            .then((res) => {
                setUser(res.data)
                console.log(res.data)
            })
    }, [])
    
    const deleteFavP = (product_id, title) => {
        const fav = {name:title};
        axios
            .post(`/api/user/delete_product/${product_id}`, fav, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
            })
    }

    const deleteFavR = (recipe_id, title) => {
        const fav = {name:title};
        axios
            .post(`/api/user/delete_recipe/${recipe_id}`, fav, {withCredentials: true})
            .then((res) => {
                console.log(res.data)
            })
    }

    const editModal = () => {
        setModal(!modal);
    }

    if(user === null) {
        return(
            <div className="fill-vertical bg-light">
                <Navbar />
                <h6>Loading...</h6>
            </div>
        )
    }

    return(
        <div className="fill-vertical bg-light">
            <Navbar />
            <div className="container-fluid">

                <h1 className="display-3 text-center py-2">Hello, {loggedUser.userInfo.firstName} {loggedUser.userInfo.lastName}</h1>
                <div className="row">
                    <img className="img-fluid rounded col-6 mx-auto" src="https://6ada39ab3e4e4dfd9962-0915b3b9e650afef6a84b370287eeb00.ssl.cf5.rackcdn.com/luce-heart-healthy.jpg" alt="healthy foods" />
                </div>
                {/* <div className="row">
                    <button className="col-2 mx-auto btn btn-outline-secondary" onClick={editModal}>Edit Info</button>
                </div> */}
                <h3 className="display-6 py-3">Favorite Products</h3>
                {user.products[0] ? "" : <Link to="/product_search">Find Products</Link>}
                <ul>
                    {user.products.map((p, idx) => {
                        return(
                            <li className="row" key={idx}>
                                <Link className="col" to={`/product/${p.id}`}>{p.name}</Link>
                                <button className="col-2 btn btn-outline-danger" onClick={() => {deleteFavP(p.id, p.name)}}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
                <hr />
                <h3 className="display-6 py-3">Favorite Recipes</h3>
                {user.recipes[0] ? "" : <Link to="/recipe_search">Find Recipes</Link>}
                <ul>
                    {user.recipes.map((r, idx) => {
                        return(
                            <li className="row" key={idx}>
                                <Link className="col" to={`/recipe/${r.id}`}>{r.name}</Link>
                                <button className="col-2 btn btn-outline-danger" onClick={() => {deleteFavR(r.id, r.name)}}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
                <hr />
            </div>
            {modal ? <EditProfile toggle={editModal} /> : ""}
        </div>
    )
}

export default Profile;
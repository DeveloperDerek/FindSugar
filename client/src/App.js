import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import axios from "axios";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { UserContext } from "./utils/UserContext";

import Product from './views/Product';
import InfoPage from './views/InfoPage';
import SearchProduct from './views/SearchProduct';
import Conversions from './views/Conversions';
import ContactPage from './views/ContactPage';
import AlertTemplate from 'react-alert-template-basic'
import SearchRecipe from './views/SearchRecipe';
import Recipe from './views/Recipe';
import Profile from "./views/Profile";

function App() {
  const [loggedUser, setLoggedUser] = useState({
    check:false,
    userInfo:{}
  });

  useEffect(() => {
    axios
    .get("/api/user/login_check", { withCredentials: true, })
    .then((res) => {
      setLoggedUser(prevData => ({
        ...prevData,
        check:true,
        userInfo:res.data
      }));
    })
    .catch(console.log);
  }, [])

  const options = {
    // you can also just use 'bottom center'
    position: positions.MIDDLE,
    timeout: 10000,
    offset: '200px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  return (
    <>
      <AlertProvider template={AlertTemplate} {...options}>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Router>
          <InfoPage path="/" />
          <SearchProduct path="/product_search" />
          <Product path="/product/:id" />
          <Conversions path="/conversion" />
          <ContactPage path="/contact" />
          <SearchRecipe path="/recipe_search" />
          <Recipe path="/recipe/:id" />
          <Profile path="/profile" />
        </Router>
      </UserContext.Provider>
      </AlertProvider>
    </>
  );
}

export default App;

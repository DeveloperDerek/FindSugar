const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    register(req, res) {
        User.create(req.body)
            .then((user) => {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.cookie(
                    "usertoken", //name of cookie
                    token, //data of cookie
                    { httpOnly: true } //additional flag included in a Set-Cookie HTTP response header. Using it when generating a cookie helps mitigate the risk of client side script accessing the protected cookie. Can't be accessed by javascript
                )
                .json({ msg: "response has a cookie"})
            })
            .catch((err) => {res.status(400).json(err)})
    },
     // UPDATE: Update one user by id, re-running validators on any changed fields
    async update(req, res) {
        const logged = await User.findById(req.params.id);
        bcrypt
            .compare(req.body.password.password, logged.password)
            .then((passwordIsValid) => {
                if (passwordIsValid) {
                    User.findByIdAndUpdate(req.params.id, req.body.info, {
                        runValidators: true,
                        context: 'query'
                    })
                        .then((updatedUser) => res.json(updatedUser))
                        .catch((err) => res.status(400).json(err));
                } else {
                    res.status(400).json({ errors :{"password" : {message : "Invalid password"}} });
                }
            })
    },
    // LOGIN: If email and password are valid, grant access
    login(req, res) {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered" })
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                res.status(400).json({ msg: "invalid email" });
                } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((passwordIsValid) => {
                        if (passwordIsValid) {
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                            res.cookie(
                                "usertoken", //name of cookie
                                token, //data of cookie
                                { httpOnly: true } //additional flag included in a Set-Cookie HTTP response header. Using it when generating a cookie helps mitigate the risk of client side script accessing the protected cookie. Can't be accessed by javascript
                            )
                            .json({ msg: "response has a cookie"})
                        } else {
                            res.status(400).json({ msg: "invalid password" });
                        }
                    })
                    .catch((err) =>
                        res.status(400).json({ msg: "invalid login attempt" })
                    );
                }
            })
            .catch((err) => res.json(err));
    },
    // LOGOUT: Remove logged cookies and revoke access
    logout(req, res) {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoken cookie cleared" })
    },
    // GETLOGGEDINUSER: Check if there is a user logged in
    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload._id)
            .then((usr) => res.json(usr))
            .catch((err) => res.json(err));
    },
    addProduct(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.update(
            {_id : decodedJWT.payload._id},
            {
                $addToSet : {
                    products : {
                        "id" : req.params.id,
                        "name" : req.body.name
                    }
                }
            }
        ).then(data => {
            res.json(data)
        })
    },
    deleteProduct(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.update(
            {_id : decodedJWT.payload._id},
            {
                $pull : {
                    products : {
                        "id" : req.params.id,
                        "name" : req.body.name
                    }
                }
            }
        ).then(data => {
            res.json(data)
        })
    },
    addRecipe(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.update(
            {_id : decodedJWT.payload._id},
            {
                $addToSet : {
                    recipes : {
                        "id" : req.params.id,
                        "name" : req.body.name
                    }
                }
            }
        ).then(data => {
            res.json(data)
        })
    },
    deleteRecipe(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.update(
            {_id : decodedJWT.payload._id},
            {
                $pull : {
                    recipes : {
                        "id" : req.params.id,
                        "name" : req.body.name
                    }
                }
            }
        ).then(data => {
            res.json(data)
        })
    }
}
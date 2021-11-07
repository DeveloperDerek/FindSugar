const googleOAuth = require("../config/googleOAuth");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
    async login(req, res) {
        try {
            console.log("TESING @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            const {tokenId} = req.body;
            const profile = await googleOAuth.getProfileInfo(tokenId);
            const checkUser = await User.findOne({ email: profile.email });
            const user = {
                googleId: profile.sub,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                password: profile.at_hash,
                confirmPassword: profile.at_hash
            }
            if (checkUser) {
                const token = jwt.sign({ _id: checkUser._id }, process.env.JWT_SECRET);
                res.cookie(
                    "usertoken",
                    token,
                    { httpOnly: true }
                )
                res.send({ user });
            } else {
                console.log("creating");
                const newUser = await User.create(user);
                const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
                res.cookie(
                    "usertoken",
                    token,
                    { httpOnly: true }
                )
                .json({ msg: "response has a cookie"})
            }
        } catch (e) {
            console.log(e);
            res.status(401).send();
        }
    }
}
const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
    const token = req.cookies.usertoken;
    console.log("user's token : ", token);
    if (!token)
        return res.status(401).json({ msg: "No authentication token, authorization denied" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({verified: false});
        //  Incase of expired jwt or invalid token kill the token and clear the cookie
        res.clearCookie("token");
        return res.status(400).send(err.message);
    }
};

module.exports = jwtAuth;
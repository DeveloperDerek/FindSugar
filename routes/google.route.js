const googleController = require("../controllers/google.controller");
const router = require("express").Router();

router.post('/login', googleController.login);

module.exports = router;
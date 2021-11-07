const contactController = require("../controllers/contact.controller");
const router = require("express").Router();

router.post("/submit", contactController.submit);
router.get("/getall", contactController.getAll);

module.exports = router;
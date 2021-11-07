const userController = require("../controllers/user.controller");
const jwtAuth = require("../config/jwt.config");
const router = require("express").Router();

router.post("/register", userController.register);
router.post("/update/:id", userController.update);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/login_check", userController.getLoggedInUser);
router.post("/add_product/:id", userController.addProduct);
router.post("/delete_product/:id", userController.deleteProduct);
router.post("/add_recipe/:id", userController.addRecipe);
router.post("/delete_recipe/:id", userController.deleteRecipe);

module.exports = router;
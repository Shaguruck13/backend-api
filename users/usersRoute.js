const router = require("express").Router();
const {listAll, listForId, register, deleteUser, patch, login} = require("./usersController")
const { validatorCreateUser, validatorEditUser } = require("../validators/users")
const uploadFile = require("../utils/handleStorage")


//get all user
router.get("/", listAll);

//get user by id
router.get("/:id", listForId);

//post register
router.post("/registers", uploadFile.single("IMG"), validatorCreateUser, register);

//login user
router.post("/login", login)

//pathc user
router.patch("/:id", uploadFile.single("IMG"), validatorEditUser, patch)

//delete user
router.delete("/:id", deleteUser);


module.exports = router
     
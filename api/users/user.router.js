//const {CreateUser,getUserByUserID,GetUsers,updateUser,deleteUser,login}=require("./user.controller");
const User=require("./user.controller");
const router=require("express").Router();
const {checkToken}=require("../../auth/token_validation")

// router.post("/",checkToken,CreateUser);
// router.get("/:id",checkToken,getUserByUserID);
// router.get("/",checkToken,GetUsers);
// router.patch("/",checkToken,updateUser);
// router.delete("/",checkToken,deleteUser);
// router.post("/login",login);
// module.exports=router;

router.post("/",checkToken,User.CreateUser);
router.get("/:id",checkToken,User.getUserByUserID);
router.get("/",checkToken,User.GetUsers);
router.patch("/",checkToken,User.updateUser);
router.delete("/",checkToken,User.deleteUser);
router.post("/login",User.login);
module.exports=router;


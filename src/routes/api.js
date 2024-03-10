
const express=require('express');
const RegistrationController = require("../controllers/RegistrationController");
const ToDoListController = require("../controllers/ToDoListController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");



const router=express.Router();


router.post("/CreateRegistration",RegistrationController.CreateRegistration)
router.post("/UserLogin",RegistrationController.UserLogin)

router.get("/ProfileRead",AuthVerifyMiddleware,RegistrationController.ProfileRead)
router.post("/UpdateProfile",AuthVerifyMiddleware,RegistrationController.UpdateProfile)


router.post("/CreateToDo",AuthVerifyMiddleware,ToDoListController.CreateToDo)
router.get("/ReadToDo",AuthVerifyMiddleware,ToDoListController.ReadToDo)
router.post("/UpdateToDo",AuthVerifyMiddleware,ToDoListController.UpdateToDo)
router.post("/DeleteToDo",AuthVerifyMiddleware,ToDoListController.DeleteToDo)

router.post("/CompleteCancelToDo",AuthVerifyMiddleware,ToDoListController.CompleteCancelToDo)


module.exports=router;
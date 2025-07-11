import { getAllUsers,getUserbyId,deleteUserById,
  patchUser,putUser,createUser
 } from "../controllers/users.controller.js";

 import { userBodyValidationRules,userParamRules } from "../validations/userValidator.js";
 import { validate } from "../middlewares/validate.js";

import { Router } from "express";
const router=Router();


//const router=express.router;


// user profile data route for auth purpose
router.get("/profile",  (req, res) => {
  res.status(200).json(req.user); // req.user comes from the decoded JWT
});

router.get("/",getAllUsers);

router.get("/:id",userParamRules,validate,getUserbyId);

router.post("/", userBodyValidationRules, validate, createUser);

router.put("/:id", userParamRules,userBodyValidationRules, validate, putUser);

router.patch("/:id", userParamRules, userBodyValidationRules, patchUser);

router.delete("/:id", userParamRules,validate,deleteUserById);







export default router;

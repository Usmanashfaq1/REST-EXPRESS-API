import { Router } from "express";

import { validate } from "../middlewares/validate.js";
import { signupValidator,loginValidator } from "../validations/authValidator.js";
import { createUser,loginUser,logoutUser} from "../controllers/auth.controller.js";

const router=Router();

//log in user
router.post("/login",loginValidator,validate,loginUser);
// sign up user
router.post("/signup",signupValidator,validate,createUser);

// Best practice for side effects:
// In REST, use:
// GET for reading,
// POST/DELETE for state changes.
// Logging out is a side effect, so it should be POST
//log out user
router.post("/logout",logoutUser);



export default router;

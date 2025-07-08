import { getAllUsers,getUserbyId,deleteUserById,
  patchUser,putUser,createUser
 } from "../controllers/users.controller.js";

import { Router } from "express";
const router=Router();


//const router=express.router;

router.get("/",getAllUsers);

router.get("/:id",getUserbyId);

router.post("/",createUser);

router.put("/",putUser);

router.patch("/",patchUser);

router.delete("/:id",deleteUserById);





export default router;

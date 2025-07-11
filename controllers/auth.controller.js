
import User from "../models/User.js";
import {createToken,maxAge} from "../utils/jsonTokens.js";


export function login(req, res, next) {}

//using async bcz mongodb functions are async
// Create new user
export const createUser = async (req, res, next) => {
  try {
    const savedUser = await User.create(req.body);
    const token=createToken(savedUser._id);
   res.cookie("jwt", token, {
     httpOnly: true,
     secure: true, // ✅ Required for HTTPS (Netlify + Railway)
     sameSite: "none", // ✅ Required for cross-origin
     maxAge: maxAge[0] * 24 * 60 * 60 * 1000,
   });


    res.status(201).json({
      message: "User created",
      user: savedUser._id,
    });
  } catch (err) {

    next(err);
    //using global error handler
    //res.status(500).json({ error: "Error creating user", details: err.message });
  }
};

// making controller function to use user model login function
export   async function loginUser(req,res,next) {
  const {email,password}=req.body;
  try
  {
     const user=await User.login(email,password);
     // sending json cookie
     const token = createToken(user._id);
     res.cookie("jwt", token, {
       httpOnly: true,
       secure: true, // ✅ Required for HTTPS (Netlify + Railway)
       sameSite: "none", // ✅ Required for cross-origin
       maxAge: maxAge[0] * 24 * 60 * 60 * 1000,
     });


     res.status(200).json({message :"login successfull",user: user._id});//sending response 200 and user id

  }
  catch(err)
  {
    next(err);

  }


}
export function logoutUser(req, res, next)
 {
  //using res.clear cookie
 res.clearCookie("jwt", {
   httpOnly: true,
   secure: true,
   sameSite: "none",
 });
  res.status(200).json({message:"logout successfull!"});
 }




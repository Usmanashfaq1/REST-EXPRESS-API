
import User from "../models/User.js";
import {createToken,maxAge} from "../utils/jsonTokens.js";


export function login(req, res, next) {}

//using async bcz mongodb functions are async
// Create new user
export const createUser = async (req, res, next) => {
  try {
    const savedUser = await User.create(req.body);
    const token=createToken(savedUser._id);
    res.cookie("jwt",token, { httpOnly:true, maxAge:maxAge[0]*24*60*60*1000});

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

export function logout(req, res, next) {}




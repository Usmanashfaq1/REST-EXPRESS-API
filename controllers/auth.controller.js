
import User from "../models/User.js";
import {createToken,maxAge} from "../utils/jsonTokens.js";

import sendRecoveryLink from "../utils/sendEmail.js";
import generateRestToken from "../utils/generateToken.js";



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


 
 export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const origin = req.headers.origin || "http://localhost:5173";

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If an account with that email exists, a reset link has been sent.",
      });
    }

    // ⛔️ Check throttling BEFORE generating and saving token
    if (
      user.resetPasswordToken &&
      user.resetPasswordExpires > Date.now()
    ) {
      return res.status(429).json({
        message: "A reset link was already sent recently. Please check your email.",
      });
    }

    // ✅ Generate and save new token
    const tokens = generateRestToken();
    const expiration = Date.now() + 15 * 60 * 1000;

    await User.updateOne(
      { _id: user._id },
      {
        resetPasswordToken: tokens.hashedToken,
        resetPasswordExpires: expiration,
      }
    );

    const resetUrl = `${origin}/reset-password/${tokens.resetToken}`;
    const message = `Click the link to reset your password:\n\n${resetUrl}\n\nThis link expires in 15 minutes.`;

    await sendRecoveryLink({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });

    return res.status(200).json({
      message: "If an account with that email exists, a reset link has been sent.",
    });

  } catch (err) {
    next(err);
  }
};



 





export const resetPassword = async (req, res) => {
  //object destructing concept
  const { token } = req.params;
  const { password } = req.body;

  try{

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Token invalid or expired" });

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  // here setting stuff to schema
  //pre gonna call before saving
  await user.save();

  res.status(200).json({ message: "Password updated" });

  }

  catch(err)
  {
    next(err);
  }

  
};





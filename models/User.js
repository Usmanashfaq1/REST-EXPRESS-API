import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Please email must  be unique"],
    lowercase: true,
    validate : [isEmail,"please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true,"Please enter password"],
    minLength: [6,"minimum length should be 6 charactes"]
  },
});

//fire a function after doc saved to db
userSchema.post('save',function(doc,next)
{
  console.log("user created in db!");
  next();

});

//mongo db hooks

//fire a function befor doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  console.log("user before going in db!", this);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // moving execution
});

//static method to login user (using mongoose)
userSchema.statics.login=async function(email,password)
{
  //finding user
const user=await this.findOne({email});
// if user exists (email matches)
if(user)
{
  const auth = await bcrypt.compare(password, user.password);
  if (auth) {
    return user;
  }
  throw Error ('Incorrect password!');



  // now password checking




}

throw Error ('Incorrect email!');


}

const User=mongoose.model('user',userSchema);

export default User;


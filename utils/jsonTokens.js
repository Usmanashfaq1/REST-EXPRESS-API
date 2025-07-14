
import jwt from "jsonwebtoken";

export const maxAge=process.env.MAX_AGE;

// id for payload
export const createToken= (id)=>
{
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}



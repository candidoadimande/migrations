import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig  from "../config/auth.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({error: "Token was not provided"})
  }
  //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY4MzkzODY3LCJleHAiOjE3Njg5OTg2Njd9.jYeFl9slm3H3BsA79OxwBFszhSOUOGpgeYEvOwccqK0
  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    
    req.userId = decoded.id
    
    console.log({decoded});
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid"})
  }
  
}
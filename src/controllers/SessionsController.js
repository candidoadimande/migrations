import jwt from "jsonwebtoken";
import User from "../models/User.js"

import authConfig  from "../config/auth.js";
const SessionsController = () => {
  return {
    async create(req, res) {
      const { email, password } = req.body;
      
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        return res.status(401).json({Error: "User not found"})
      }
      
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({Error: "Password not match"})
      }
      const { id, name } = user;
      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }
  }
}

export default SessionsController;
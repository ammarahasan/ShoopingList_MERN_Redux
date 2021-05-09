import User from "../models/User.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, roles } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please inter all fields" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "user email already exist" });
  }
  const newUser = new User({
    name,
    email,
    password,
    roles,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          { id: user.id, roles: user.roles },
          config.get("jwtSecret"),
          {
            expiresIn: 7 * 24 * 60 * 60,
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
              },
            });
          }
        );
      });
    });
  });
};

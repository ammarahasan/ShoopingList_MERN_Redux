import User from "../models/User.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

// auth user (login)
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please inter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user does not exist" });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid password" });
        }
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
    }
  } catch (err) {
    console.log(err);
  }
};

// get logged in user
export const getUser = async (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};

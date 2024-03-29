import config from "config";
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  //check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: "Token is not valid",
    });
  }
}

export default authMiddleware;

import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { authUser, getUser } from "../../controllers/authController.js";

const router = Router();

// @route POST api/auth
// @desc Auth user
// @access public
router.post("/", authUser);

// @route GET api/auth/user
// @desc GET user data
// @access Private
router.get("/user", authMiddleware, getUser);

export default router;

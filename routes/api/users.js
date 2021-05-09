import { Router } from "express";

const router = Router();

// @route POST api/users
// @desc Register new user
// @access public
import { registerUser } from "../../controllers/usersController.js";

router.post("/", registerUser);

export default router;

import { Router } from "express";
import {
  getItems,
  createItem,
  deleteItem,
} from "../../controllers/itemsController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import roleMiddleware from "../../middleware/rolesMiddleware.js";

const router = Router();

// @route GET api/items
// @desc Get All Items
// @access public
router.get("/", getItems);

// @route POST api/items
// @desc create A Item
// @access Private
// registered users create items
router.post("/", authMiddleware, createItem);

// @route DELETE api/items
// @desc Delete A Item
// @access Private
// Admin users create items
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteItem);

export default router;

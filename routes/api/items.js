import { Router } from "express";
import Item from "../../models/Item.js";

const router = Router();

// @route GET api/items
// @desc Get All Items
// @access public
router.get("/", async (req, res) => {
  try {
    const data = await Item.find().sort({ date: -1 });
    const items = await res.json(data);
    res.json(items);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// @route POST api/items
// @desc create A Item
// @access public
router.post("/", async (req, res) => {
  try {
    // console.log(req.body.name[0]);
    const newItem = new Item({ name: req.body.name[0] });
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// @route DELETE api/items
// @desc Delete A Item
// @access public
router.delete("/:id", async (req, res) => {
  try {
    const item_to_delete = await Item.findById(req.params.id);
    const item = await item_to_delete.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false, message: "item not found" });
  }
});

export default router;

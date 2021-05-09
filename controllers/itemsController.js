import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ date: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item_to_delete = await Item.findById(req.params.id);
    const item = await item_to_delete.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false, message: "item not found" });
  }
};

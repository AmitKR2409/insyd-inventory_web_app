const express = require("express");
const InventoryItem = require("../models/InventoryItem");
const StockHistory = require("../models/StockHistory");

const router = express.Router();

// Create new inventory item
router.post("/items", async (req, res) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all inventory items
router.get("/items", async (req, res) => {
  const items = await InventoryItem.find();
  res.json(items);
});

// Update stock
router.post("/items/:id/update", async (req, res) => {
  const { change, reason } = req.body;

  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.quantity += change;
    await item.save();

    await StockHistory.create({
      itemId: item._id,
      change,
      reason,
    });

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get stock history for an item
router.get("/items/:id/history", async (req, res) => {
  const history = await StockHistory.find({ itemId: req.params.id }).sort({ createdAt: -1 });
  res.json(history);
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Item = require("../models/InventoryItem");
const StockHistory = require("../models/StockHistory");

router.get("/", async (req, res) => {
  try {
    // 1. Low Stock Items
    const lowStockItems = await Item.find({ quantity: { $lt: 20 } });

    // 2. Stock movement count per item
    const movementStats = await StockHistory.aggregate([
      {
        $group: {
          _id: "$itemId",
          changesCount: { $sum: 1 }
        }
      }
    ]);

    // Map itemId -> changesCount
    const movementMap = {};
    movementStats.forEach(stat => {
      movementMap[stat._id.toString()] = stat.changesCount;
    });

    const items = await Item.find();

    const fastMovingItems = [];
    const slowMovingItems = [];

    items.forEach(item => {
      const count = movementMap[item._id.toString()] || 0;
      if (count >= 2) {
        fastMovingItems.push({ item, changes: count });
      } else {
        slowMovingItems.push({ item, changes: count });
      }
    });

    // 3. Top Reasons
    const topReasons = await StockHistory.aggregate([
      {
        $group: {
          _id: "$reason",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      lowStockItems,
      fastMovingItems,
      slowMovingItems,
      topReasons
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate insights" });
  }
});

module.exports = router;
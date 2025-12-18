const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    default: "Owner",
  },
}, { timestamps: true });

module.exports = mongoose.model("StockHistory", stockHistorySchema);
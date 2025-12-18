"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "../lib/api";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [change, setChange] = useState("");
  const [reason, setReason] = useState("");
  const [history, setHistory] = useState([]);
  const [insights, setInsights] = useState(null);

  // Fetch inventory + insights on load
  useEffect(() => {
    fetchItems();
    fetchInsights();
  }, []);

  // Fetch inventory items
  const fetchItems = async () => {
    const res = await fetch(`${API_BASE_URL}/items`);
    const data = await res.json();
    setItems(data);
  };

  // Fetch stock history for selected item
  const fetchHistory = async (itemId) => {
    const res = await fetch(`${API_BASE_URL}/items/${itemId}/history`);
    const data = await res.json();
    setHistory(data);
  };

  // Fetch actionable insights
  const fetchInsights = async () => {
    const res = await fetch(`${API_BASE_URL}/insights`);
    const data = await res.json();
    setInsights(data);
  };

  // Update stock
  const updateStock = async () => {
    if (!selectedItem || !change || !reason) {
      alert("Please enter change and reason");
      return;
    }

    await fetch(`${API_BASE_URL}/items/${selectedItem._id}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        change: Number(change),
        reason,
      }),
    });

    setChange("");
    setReason("");
    fetchItems();
    fetchHistory(selectedItem._id);
    fetchInsights(); // refresh insights after update
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Inventory Transparency Dashboard</h1>

      {/* INVENTORY LIST */}
      <h2>Inventory Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <button
              onClick={() => {
                setSelectedItem(item);
                fetchHistory(item._id);
              }}
            >
              {item.name} — Qty: {item.quantity}
            </button>
          </li>
        ))}
      </ul>

      {/* UPDATE + HISTORY */}
      {selectedItem && (
        <>
          <h2>Update Stock: {selectedItem.name}</h2>

          <input
            type="number"
            placeholder="Change (+ / -)"
            value={change}
            onChange={(e) => setChange(e.target.value)}
          />
          <br /><br />

          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <br /><br />

          <button onClick={updateStock}>Update Stock</button>

          <h3>Stock Change History</h3>
          <ul>
            {history.map((h) => (
              <li key={h._id}>
                {h.change} | {h.reason} |{" "}
                {new Date(h.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ACTIONABLE INSIGHTS */}
      {insights && (
        <>
          <h2 style={{ marginTop: "40px" }}>Actionable Insights</h2>

          <h3>Low Stock Items</h3>
          {insights.lowStockItems.length === 0 ? (
            <p>No low stock items</p>
          ) : (
            <ul>
              {insights.lowStockItems.map((item) => (
                <li key={item._id}>
                  {item.name} — Qty: {item.quantity}
                </li>
              ))}
            </ul>
          )}

          <h3>Fast Moving Items</h3>
          {insights.fastMovingItems.length === 0 ? (
            <p>No fast moving items</p>
          ) : (
            <ul>
              {insights.fastMovingItems.map((entry) => (
                <li key={entry.item._id}>
                  {entry.item.name} — Changes: {entry.changes}
                </li>
              ))}
            </ul>
          )}

          <h3>Slow Moving Items</h3>
          {insights.slowMovingItems.length === 0 ? (
            <p>No slow moving items</p>
          ) : (
            <ul>
              {insights.slowMovingItems.map((entry) => (
                <li key={entry.item._id}>
                  {entry.item.name} — Changes: {entry.changes}
                </li>
              ))}
            </ul>
          )}

          <h3>Top Stock Change Reasons</h3>
          <ul>
            {insights.topReasons.map((reason) => (
              <li key={reason._id}>
                {reason._id} — {reason.count} times
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
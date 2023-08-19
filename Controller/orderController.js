const express = require("express");
const appError = require("../utilities/appError");
const catchAsync = require("./../utilities/catchAsync");
const dbPool = require("../dbConnectionPool/dbPool");

exports.placeOrder = catchAsync(async (req, res, next) => {
  const { product_id, customer_name, location, address, quantity } = req.body;

  const query = `
            INSERT INTO place_order (product_id, customer_name, location, address, quantity,createdAt,rider_id)
            VALUES ( ?, ?, ?, ?, ?,?,?)
          `;

  const result = dbPool.query(query, [
    product_id,
    customer_name,
    location,
    address,
    quantity,
    Date.now(),
    0,
  ]);

  res.status(201).json({
    status: "success order Placed",
    data: {
      id: result.insertId,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  dbPool.query("SELECT * FROM place_order", (err, results) => {
    const orders = results.filter((x) => x.rider_id);
    console.log(orders);
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ results: results });
    }
  });
});
exports.getAllOrdersForRider = catchAsync(async (req, res, next) => {
  dbPool.query("SELECT * FROM place_order", (err, results) => {
    const orders = results.filter((x) => x.rider_id);
    console.log(orders);
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ results: results.filter((x) => x.rider_id == 0) });
    }
  });
});

exports.orderSigned = catchAsync(async (req, res, next) => {
  const { riderId } = req.body;
  const { orderId } = req.params;

  console.log(riderId, orderId);
  const query = `
  UPDATE place_order
  SET rider_id = ?
  WHERE id = ?
`;

  try {
    const result = dbPool.query(query, [riderId, orderId]);

    if (result.affectedRows == 0) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json({
        status: "order Assigned",
        // status: result,
      });
    }
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.getOrderForRider = catchAsync(async (req, res, next) => {
  const { riderId } = req.params;

  const query = `
  SELECT * FROM place_order
  WHERE rider_id = ?
`;

  try {
    const [results] = await dbPool.promise().query(query, [riderId]);

    if (results.length === 0) {
      res.status(404).json({ error: "No place orders found for the rider" });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          place_orders: results,
        },
      });
    }
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

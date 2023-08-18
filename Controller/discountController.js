const express = require("express");
const appError = require("../utilities/appError");
const catchAsync = require("./../utilities/catchAsync");
const dbPool = require("../dbConnectionPool/dbPool");

exports.createDiscount = catchAsync(async (req, res, next) => {
  const { discountText, percentage } = req.body;

  const query = `
            INSERT INTO discount (discount_text, percentage)
            VALUES ( ?, ?)
          `;

  const result = dbPool.query(query, [discountText, percentage]);

  res.status(201).json({
    status: "Discrount Created",
    data: {
      id: result.insertId,
    },
  });
});

exports.getAllDiscounts = catchAsync(async (req, res, next) => {
  dbPool.query("SELECT * FROM discount", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ results: results, length: results.length });
    }
  });
});

exports.deleteDiscount = catchAsync(async (req, res, next) => {
  const discountId = req.params.id;

  const deleteQuery = `
      DELETE FROM discount
      WHERE id = ?
    `;

  dbPool.query(deleteQuery, [discountId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Discount not found" });
      } else {
        res.status(200).json({ status: "Discount deleted successfully" });
      }
    }
  });
});

exports.getDiscountByDiscountText = catchAsync(async (req, res, next) => {
  const discountText = req.params.discount; // Get the discountText from query parameter

  const query = `
      SELECT * FROM discount
      WHERE discount_text = ?
    `;

  try {
    const [results] = await dbPool.promise().query(query, [discountText]);

    if (results.length === 0) {
      res.status(404).json({ error: "Discount not found" });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          discount: results[0],
        },
      });
    }
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

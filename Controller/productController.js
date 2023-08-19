const express = require("express");
const appError = require("../utilities/appError");
const catchAsync = require("./../utilities/catchAsync");
const dbPool = require("../dbConnectionPool/dbPool");

exports.getAll = catchAsync(async (req, res, next) => {
  dbPool.query("SELECT * FROM product", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ results: results, length: results.length });
    }
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const productName = req.params.name; // Assuming the name is sent as a route parameter
  console.log("GET ONE PRODUCT");
  dbPool.query("SELECT * FROM product", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({
        results: results.filter((x) => x.name == productName),
      });
    }
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    image,
    price,

    stock,
    last_update,
    description,
    status,
    category,
  } = req.body;

  console.log("POST REQUEST");
  const query = `
          INSERT INTO product (name, image, price, stock, created_at, last_update, description, status, category)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

  const result = dbPool.query(query, [
    name,
    image,
    price,
    stock,
    Date.now(),
    last_update,
    description,
    status,
    category,
  ]);

  res.status(201).json({
    status: "success",
    data: {
      id: result.insertId,
    },
  });
});

exports.addCategory = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  console.log("POST REQUEST");
  const query = `
          INSERT INTO category (name, description)
          VALUES ( ?, ?)
        `;

  const result = dbPool.query(query, [name, description]);

  res.status(201).json({
    status: "success",
    data: {
      id: result.insertId,
    },
  });
});

exports.getAllCategory = catchAsync(async (req, res, next) => {
  dbPool.query("SELECT * FROM category", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ results: results, length: results.length });
    }
  });
});

exports.getOneCategory = catchAsync(async (req, res, next) => {
  const categoryName = req.params.name; // Assuming the name is sent as a route parameter
  dbPool.query("SELECT * FROM category", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({
        results: results.filter((x) => x.name == categoryName),
      });
    }
  });
});

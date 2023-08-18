const express = require("express");
const appError = require("../utilities/appError");
const catchAsync = require("./../utilities/catchAsync");
const dbPool = require("../dbConnectionPool/dbPool");

exports.riderSignup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const isVerified = false;

  if (password != confirmPassword) {
    console.error("Error executing query: password doesn't Match");
    res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
              INSERT INTO rider (name, email, password, isVerified)
              VALUES ( ?, ?, ?, ?)
            `;

  const result = dbPool.query(query, [
    name,
    email,
    password,
    confirmPassword,
    isVerified,
  ]);

  res.status(201).json({
    status: "Rider Account Created",
  });
});

exports.getAllRider = catchAsync(async (req, res, next) => {
  dbPool.query("SELECT * FROM rider", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ results: results, length: results.length });
    }
  });
});

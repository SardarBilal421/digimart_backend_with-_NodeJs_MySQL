const bcrypt = require("bcrypt");
const dbPool = require("../dbConnectionPool/dbPool");
const saltRounds = 10;

exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const insertQuery = `
    INSERT INTO admin (name, email, password)
    VALUES (?, ?, ?)
  `;

  try {
    const [result] = await dbPool
      .promise()
      .query(insertQuery, [username, email, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const selectQuery = `
      SELECT id, password FROM admin
      WHERE email = ?
    `;

  try {
    const [results] = await dbPool.promise().query(selectQuery, [email]);
    const user = results[0];

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({ user: results, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error executing query:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

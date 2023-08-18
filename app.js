const express = require("express");
const port = 5000; // Change this to your desired port number
const dbPool = require("./dbConnectionPool/dbPool");
const ProductRouter = require("./Routes/productRoutes");
const orderRoutes = require("./Routes/orderRouter");
const riderRoutes = require("./Routes/riderRoutes");
const discountRoutes = require("./Routes/discountRouter");

const app = express();
app.use(express.json());

app.use("/product", ProductRouter);
app.use("/order", orderRoutes);
app.use("/rider", riderRoutes);
app.use("/discount", discountRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

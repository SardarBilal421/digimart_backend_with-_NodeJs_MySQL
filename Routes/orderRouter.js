const express = require("express");
const orderController = require("./../Controller/orderController");

const router = express.Router({ mergeParams: true });

router.route("/").get(orderController.getAllOrders);
router.route("/rider").get(orderController.getAllOrdersForRider);
router
  .route("/getOrderForRider/:riderId")
  .get(orderController.getOrderForRider);
//   .post(productController.createProduct);

router.post("/placeOrder", orderController.placeOrder);
router.patch("/assignOrder/:orderId", orderController.orderSigned);

module.exports = router;

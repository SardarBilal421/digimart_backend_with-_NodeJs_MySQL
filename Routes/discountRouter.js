const express = require("express");
const discountController = require("./../Controller/discountController");

const router = express.Router({ mergeParams: true });

router.route("/").get(discountController.getAllDiscounts);
router.get("/:discount", discountController.getDiscountByDiscountText);
router.post("/createDiscount", discountController.createDiscount);
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;

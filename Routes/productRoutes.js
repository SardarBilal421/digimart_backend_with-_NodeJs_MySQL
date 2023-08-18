const express = require("express");
const productController = require("./../Controller/productController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(productController.getAll)
  .post(productController.createProduct);

router.route("/addCategory").post(productController.addCategory);
router.route("/:name").get(productController.getOne);

router.route("/getAllCategory").get(productController.getAllCategory);
router.route("/getAllCategory/:name").get(productController.getOneCategory);
module.exports = router;

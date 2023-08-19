const express = require("express");
const riderController = require("./../Controller/riderController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(riderController.riderSignup)
  .get(riderController.getAllRider);

router.route("/verifyRider/:id").patch(riderController.updateRiderVerification);

module.exports = router;

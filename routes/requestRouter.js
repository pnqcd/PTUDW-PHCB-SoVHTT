const express = require("express");
const router = express.Router();
const controller = require("../controllers/requestController");

router.get("/", controller.show);

router.put("/request-edit-ads", controller.requestEditAds);
router.get("/showOriginAdsDetail", controller.showOriginAdsDetail);

router.put("/request-edit-place", controller.requestEditPlace);
router.get("/showOriginPlaceDetail", controller.showOriginPlaceDetail);

router.post("/approve-ads", controller.approveAds);

module.exports = router;

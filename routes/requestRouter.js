const express = require("express");
const router = express.Router();
const controller = require("../controllers/requestController");

router.get("/", controller.show);

router.put("/request-edit-ads", controller.requestEditAds);
router.get("/showOriginAdsDetail", controller.showOriginAdsDetail);

router.put("/request-edit-place", controller.requestEditPlace);
router.get("/showOriginPlaceDetail", controller.showOriginPlaceDetail);

// router.post("/ads", controller.addAds);
// router.put("/ads", controller.editAds);
// router.delete("/ads/:id", controller.deleteAds);

// router.post("/adstype", controller.addAdstype);
// router.put("/adstype", controller.editAdstype);
// router.delete("/adstype/:id", controller.deleteAdstype);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/requestController");

router.get("/", controller.show);

// router.post("/wards", controller.addWard);
// router.put("/wards", controller.editWard);
// router.delete("/wards/:id", controller.deleteWard);

// router.post("/places", controller.addPlace);
// router.put("/places", controller.editPlace);
// router.delete("/places/:id", controller.deletePlace);

// router.post("/ads", controller.addAds);
// router.put("/ads", controller.editAds);
// router.delete("/ads/:id", controller.deleteAds);

// router.post("/adstype", controller.addAdstype);
// router.put("/adstype", controller.editAdstype);
// router.delete("/adstype/:id", controller.deleteAdstype);

module.exports = router;

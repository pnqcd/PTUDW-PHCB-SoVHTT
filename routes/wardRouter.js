const express = require("express");
const router = express.Router();
const controller = require("../controllers/wardController");

router.get("/", controller.show);
router.post("/wards", controller.addWard);
router.put("/wards", controller.editWard);
router.delete("/wards/:id", controller.deleteWard);

router.post("/places", controller.addPlace);
router.put("/places", controller.editPlace);
router.delete("/places/:id", controller.deletePlace);

module.exports = router;

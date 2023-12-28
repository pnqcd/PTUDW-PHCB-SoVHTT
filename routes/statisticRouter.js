const express = require("express");
const router = express.Router();
const controller = require("../controllers/statisticController");

router.get("/", controller.show);
router.get("/all-reports", controller.getAllReports);

module.exports = router;
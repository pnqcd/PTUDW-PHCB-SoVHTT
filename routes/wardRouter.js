const express = require("express");
const router = express.Router();
const controller = require("../controllers/wardController");

router.get("/", controller.show);
router.post("/", controller.addWard);
router.put("/", controller.editWard);
router.delete("/:id", controller.deleteWard);

module.exports = router;

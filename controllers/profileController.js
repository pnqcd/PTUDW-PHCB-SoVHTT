const controller = {};
// const models = require("../models");

controller.show = async (req, res) => {
    res.render("profile");
};

module.exports = controller;
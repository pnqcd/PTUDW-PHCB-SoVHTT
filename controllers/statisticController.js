const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
    // res.locals.users = await models.User.findAll({
    //     attributes: [
    //     "id",
    //     "imagePath",
    //     "fullName",
    //     "username",
    //     "isWard",
    //     "isDistrict",
    //     "isDepartment",
    //     "wardUnit",
    //     "districtUnit"
    //     ],
    //     order: [["createdAt", "DESC"]],
    // });
    res.render("statistic");
};

module.exports = controller;

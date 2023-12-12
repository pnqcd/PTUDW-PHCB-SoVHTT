const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "fullName",
      "username",
      "isWard",
      "isDistrict",
      "isDepartment",
      "wardUnit",
      "districtUnit"
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("manage-account");
};

controller.addUser = async (req, res) => {
  let {username, fullName, isWard, isDistrict, isDepartment, workUnit} = req.body;
  try {
    await models.User.create({
      username,
      fullName,
      isWard: isWard ? true : false,
      isDistrict: isDistrict ? true : false,
      isDepartment: isDepartment ? true : false,
      wardUnit,
      districtUnit
    });
    res.redirect("/tai-khoan");
  } catch (error) {
    res.send("Can't add user");
    console.error(error);
  }
  // res.send(req.body);
  // console.log(req);
  // res.redirect("/users");
}

controller.deleteUser = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.User.destroy(
      {where: {id}}
    );
    res.send("User deleted!");
  } catch (error) {
    res.send("Can't delete user!");
    console.error(error);
  }
}

module.exports = controller;

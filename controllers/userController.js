const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "dob",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isWard",
      "isDistrict",
      "isDepartment",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("manage-account");
};

controller.addUser = async (req, res) => {
  let {username, firstName, lastName, mobile, dob, isWard, isDistrict, isDepartment} = req.body;
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      dob,
      isAdmin: isWard ? true : false,
      isAdmin: isDistrict ? true : false,
      isAdmin: isDepartment ? true : false,
    });
    res.redirect("/users");
  } catch (error) {
    res.send("Can't add user");
    console.error(error);
  }
  // res.send(req.body);
  // console.log(req);
  // res.redirect("/users");
}

controller.editUser = async (req, res) => {
  let {id, firstName, lastName, mobile, dob, isWard, isDistrict, isDepartment} = req.body;
  try {
    await models.User.update(
      {firstName, lastName, mobile, dob, isWard: isWard?true:false, isDistrict: isDistrict?true:false, isDepartment: isDepartment?true:false},
      {where: {id}}
    );
    res.send("User updated!");
  } catch (error) {
    res.send("Can't update user!");
    console.error(error);
  }
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

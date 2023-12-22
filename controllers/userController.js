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
  let {username, fullName, chucVu, wardUnit, districtUnit, password} = req.body;

  const isExisted = await models.User.findOne({ where: {username} });
  if (isExisted) {
    return res.json({ error: true, message: 'Tên đăng nhập đã tồn tại!' });
  }
  if (!isExisted) {
    try {
      await models.User.create({
        username,
        password,
        fullName,
        isWard: chucVu=="Cán bộ phường" ? true : false,
        isDistrict: chucVu=="Cán bộ quận" ? true : false,
        isDepartment: false,
        wardUnit,
        districtUnit
      });
      res.redirect("/tai-khoan");
    } catch (error) {
      res.send("Can't add user");
      console.error(error);
    }
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

controller.checkUsername = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await models.User.findOne({ where: { username } });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = controller;

const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.wards = await models.Ward.findAll({
    attributes: [
      "id",
      "wardName",
      "districtName",
      "zipCode",
      "population",
      "imagePath",
    ],
    order: [["createdAt", "DESC"]],
  });

  res.locals.places = await models.Place.findAll({
    attributes: [
      "id",
      "diaChi",
      "khuVuc",
      "loaiVT",
      "hinhThuc",
      "quyHoach",
      "hinhAnh",
    ],
    order: [["createdAt", "DESC"]],
    // limit: 10,
  });

  // models.Place.hasMany(models.Placedetail, { foreignKey: 'placeId' });
  res.locals.placedetails = await models.Placedetail.findAll({
    include: [{
      model: models.Place,
      attributes: [
        "diaChi",
        "khuVuc",
      ],
    }],
    attributes: [
      "id",
      "adName",
      "adSize",
      "adQuantity",
      "expireDay",
      "imagePath",
    ],
    order: [["createdAt", "DESC"]],
    // limit: 10,
  });

  res.render("manage-list");
};

controller.addWard = async (req, res) => {
  let {wardName, districtName, zipCode, population} = req.body;
  try {
    await models.Ward.create({
      wardName, 
      districtName, 
      zipCode, 
      population
    });
    res.redirect("/danh-sach");
  } catch (error) {
    res.send("Không thể thêm phường");
    console.error(error);
  }
}

controller.editWard = async (req, res) => {
  let {id, wardName, districtName, zipCode, population} = req.body;
  try {
    await models.Ward.update(
      {wardName, districtName, zipCode, population},
      {where: {id}}
    );
    res.send("Đã cập nhật phường!");
  } catch (error) {
    res.send("Không thể cập nhật phường!");
    console.error(error);
  }
}

controller.deleteWard = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Ward.destroy(
      {where: {id}}
    );
    res.send("Đã xoá phường!");
  } catch (error) {
    res.send("Không thể xoá phường!");
    console.error(error);
  }
}

controller.addPlace = async (req, res) => {
  let {diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach} = req.body;
  try {
    await models.Place.create({
      diaChi, 
      khuVuc, 
      loaiVT, 
      hinhThuc, 
      quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"
    });
    res.redirect("/danh-sach");
  } catch (error) {
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}

controller.editPlace = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach} = req.body;
  try {
    await models.Place.update(
      { 
        diaChi, 
        khuVuc, 
        loaiVT, 
        hinhThuc, 
        quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"
      },
      {where: {id}}
    );
    res.send("Đã cập nhật điểm đặt!");
  } catch (error) {
    res.send("Không thể cập nhật điểm đặt!");
    console.error(error);
  }
}

controller.deletePlace = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Place.destroy(
      {where: {id}}
    );
    res.send("Đã xoá điểm đặt!");
  } catch (error) {
    res.send("Không thể xoá điểm đặt!");
    console.error(error);
  }
}

controller.addAds = async (req, res) => {
  let {adName, diaChiAds, adSize, adQuantity, expireDay} = req.body;
  const placeId = await models.Place.findOne({ 
    attributes: ["id"],
    where: {diaChi: diaChiAds} 
  });
  let id = placeId.getDataValue("id");
  console.log(diaChiAds);
  console.log(id);
  try {
    await models.Placedetail.create({
      placeId: id,
      adName, 
      adSize, 
      adQuantity, 
      expireDay, 
    });
    res.redirect("/danh-sach");
  } catch (error) {
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}

controller.editAds = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach} = req.body;
  try {
    await models.Placedetail.update(
      { diaChi, 
        khuVuc, 
        loaiVT, 
        hinhThuc, 
        quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"
      },
      {where: {id}}
    );
    res.send("Đã cập nhật điểm đặt!");
  } catch (error) {
    res.send("Không thể cập nhật điểm đặt!");
    console.error(error);
  }
}

controller.deleteAds = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Placedetail.destroy(
      {where: {id}}
    );
    res.send("Đã xoá điểm đặt!");
  } catch (error) {
    res.send("Không thể xoá điểm đặt!");
    console.error(error);
  }
}

module.exports = controller;

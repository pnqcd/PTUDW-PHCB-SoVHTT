const controller = {};
const moment = require('moment');

const Pool = require('pg').Pool
const fs = require('fs');
const pool = new Pool({
    user: "yoaqtxvl",
    host: "rain.db.elephantsql.com",
    database: "yoaqtxvl",
    password: "PPr7gzt67BbTzFagQlqq_MzwzfpzX2Hr",
    port: 5432
});

controller.show = async (req, res) => {
    const editAdsQuery = pool.query(`SELECT p.id, r."adName", r."placeId", p."diaChi", p."khuVuc", r."adSize", r."adQuantity", r."expireDay", r."imagePath", r."liDoChinhSua" 
        FROM "Requesteditads" r JOIN "Places" p ON r."placeId" = p.id 
        ORDER BY r."createdAt" DESC`);

    const editPlaceQuery = pool.query(`SELECT id, "diaChi", "khuVuc", "loaiVT", "hinhThuc", "hinhAnh", "quyHoach", "liDoChinhSua"
        FROM "Requesteditplaces" 
        ORDER BY "createdAt" DESC`);

    try {
        const [editAdsResult] = await Promise.all([editAdsQuery]);
        res.locals.editAdsRequests = editAdsResult.rows.map((row) => ({
            ...row,
            expireDay: moment(row.expireDay).format('MM/DD/YYYY'),
        }));

        res.render("request");
    } catch (error) {
        console.log("Error: ", error);
    }
};

module.exports = controller;
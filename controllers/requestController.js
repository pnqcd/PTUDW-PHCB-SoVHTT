const controller = {};
const moment = require('moment');
const pool = require("../database/database");

controller.show = async (req, res) => {
    const editAdsQuery = pool.query(`SELECT r.id, r."placeId", r."originId", r."adName", p."diaChi", p."khuVuc", r."adSize", r."adQuantity", r."expireDay", r."imagePath", r."liDoChinhSua" 
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

controller.requestEditAds = async (req, res) => {
    let {id, originId, placeId, adNameRequest, adSizeRequest, adQuantityRequest, expireDayRequest, handleAdsEditRequest} = req.body;

    try {
        if (handleAdsEditRequest == "Phê duyệt") {
            const updateQuery = `UPDATE "Placedetails"
                                SET "placeId" = $1, "adName" = $2, "adSize" = $3, "adQuantity" = $4, "expireDay" = $5
                                WHERE id = $6`;
            await pool.query(updateQuery, [
                placeId,
                adNameRequest,
                adSizeRequest,
                adQuantityRequest,
                expireDayRequest,
                originId
            ]);
            res.send("Đã cập nhật bảng QC!");
        } 

        // Delete handled request
        const deleteQuery = `
            DELETE FROM "Requesteditads"
            WHERE id = $1
        `;
        await pool.query(deleteQuery, [id]);
        res.send('Xoá yêu cầu đã xử lý thành công');
    } catch (error) {
        // res.send("Lỗi rồi");
        console.error(error);
    }
}

module.exports = controller;
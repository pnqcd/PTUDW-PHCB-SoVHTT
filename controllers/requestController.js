const controller = {};
const moment = require('moment');
const pool = require("../database/database");

controller.show = async (req, res) => {
    const editAdsQuery = pool.query(`SELECT r.id, r."placeId", r."originId", r."adName", p."diaChi", p."khuVuc", r."adSize", r."adQuantity", r."expireDay", r."imagePath", r."liDoChinhSua" 
        FROM "Requesteditads" r JOIN "Places" p ON r."placeId" = p.id 
        ORDER BY r."createdAt" DESC`);

    const editPlaceQuery = pool.query(`SELECT id, "placeId", "diaChi", "khuVuc", "loaiVT", "hinhThuc", "hinhAnh", "quyHoach", "liDoChinhSua"
        FROM "Requesteditplaces" 
        ORDER BY "createdAt" DESC`);

    try {
        const [editAdsResult, editPlaceResult] = await Promise.all([editAdsQuery, editPlaceQuery]);

        res.locals.editAdsRequests = editAdsResult.rows.map((row) => ({
            ...row,
            expireDay: moment(row.expireDay).format('MM/DD/YYYY'),
        }));

        res.locals.editPlaceRequests = editPlaceResult.rows;

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

controller.requestEditPlace = async (req, res) => {
    let {id, placeId, diaChiRequest, khuVucRequest, loaiVtRequest, hinhThucRequest, isQuyHoach, handlePlaceEditRequest} = req.body;

    try {
        if (handlePlaceEditRequest == "Phê duyệt") {
            const updateQuery = `UPDATE "Places"
                                SET "diaChi" = $1, "khuVuc" = $2, "loaiVT" = $3, "hinhThuc" = $4, "quyHoach" = $5
                                WHERE id = $6`;
            await pool.query(updateQuery, [
                diaChiRequest,
                khuVucRequest,
                loaiVtRequest,
                hinhThucRequest,
                isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH",
                placeId
            ]);
            res.send("Đã cập nhật điểm đặt!");
        } 

        // Delete handled request
        const deleteQuery = `
            DELETE FROM "Requesteditplaces"
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
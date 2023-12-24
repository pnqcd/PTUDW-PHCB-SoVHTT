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

    const adsLicenseQuery = pool.query(`SELECT r.id, r."congTy", r."diaChiCongTy", r."dienThoai", r.email, r."placeId", p."diaChi", r."tenBangQuangCao", r."loaiQC", r."kichThuoc", r."soLuong", r."hinhAnh", r."ngayBatDau", r."ngayKetThuc", r."tinhTrang"
        FROM "Requestads" r JOIN "Places" p ON r."placeId" = p.id
        ORDER BY r."createdAt" DESC`);

    try {
        const [editAdsResult, editPlaceResult, adsLicenseResult] = await Promise.all([editAdsQuery, editPlaceQuery, adsLicenseQuery]);

        res.locals.editAdsRequests = editAdsResult.rows.map((row) => ({
            ...row,
            expireDay: moment(row.expireDay).format('MM/DD/YYYY'),
        }));

        res.locals.editPlaceRequests = editPlaceResult.rows;

        res.locals.adsLicenseRequests = adsLicenseResult.rows
        .map((row) => ({
            ...row, 
            ngayBatDau: moment(row.ngayBatDau).format('MM/DD/YYYY'),
            ngayKetThuc: moment(row.ngayKetThuc).format('MM/DD/YYYY')
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

controller.showOriginPlaceDetail = async (req, res) => {
    const { placeId } = req.query;
    if (placeId) {
        pool.query(`SELECT * FROM "Places" WHERE id = ` + placeId, (error, results) => {
            if (error) {
                res.status(500).json({ error });
                console.log("loi roi")
            } else {
                res.json({ originPlace: results.rows });
            }
        });
    }

    const { requestId } = req.query;
    if (requestId) {
        pool.query(`SELECT * FROM "Requesteditplaces" WHERE id = ` + requestId, (error, results) => {
            if (error) {
                res.status(500).json({ error });
                console.log("loi roi")
            } else {
                res.json({ requestPlace: results.rows });
            }
        });
    }
}

controller.showOriginAdsDetail = async (req, res) => {
    const { adsId } = req.query;
    if (adsId) {
        pool.query(`SELECT d."adName", p."diaChi", p."khuVuc", d."adSize", d."adQuantity", d."expireDay" 
                    FROM "Placedetails" d JOIN "Places" p ON d."placeId" = p.id 
                    WHERE d.id = ` + adsId, (error, results) => {
                        if (error) {
                            res.status(500).json({ error });
                            console.log("loi roi");
                        } else {
                            let formattedResults = results.rows.map(row => ({
                                ...row,
                                expireDay: moment(row.expireDay).format("MM/DD/YYYY")
                            }));
                            res.json({ originAds: formattedResults });
                        }
        });
    }

    const { requestId } = req.query;
    if (requestId) {
        pool.query(`SELECT r."adName", p."diaChi", p."khuVuc", r."adSize", r."adQuantity", r."expireDay" 
                    FROM "Requesteditads" r JOIN "Places" p ON r."placeId" = p.id 
                    WHERE r.id = ` + requestId, (error, results) => {
                        if (error) {
                            res.status(500).json({ error });
                            console.log("loi roi");
                        } else {
                            let formattedResults = results.rows.map(row => ({
                                ...row,
                                expireDay: moment(row.expireDay).format("MM/DD/YYYY")
                            }));
                            res.json({ requestAds: formattedResults });
                        }
                    });
    }
}

module.exports = controller;
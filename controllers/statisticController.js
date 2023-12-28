const controller = {};
const models = require("../models");
const pool = require("../database/database");

controller.show = async (req, res) => {
    let result = await pool.query(`SELECT DISTINCT "districtName" FROM "Wards"`);
    res.locals.districts = result.rows;
    
    const locationCount = await pool.query(`SELECT COUNT(locationreport) FROM reports WHERE locationreport=true`);
    res.locals.locationReports = locationCount.rows[0].count;

    const adsCount = await pool.query(`SELECT COUNT(locationreport) FROM reports WHERE locationreport=false`);
    res.locals.adsReports = adsCount.rows[0].count;

    res.render("statistic");
};

controller.getAllReports = async (req, res) => {
    // const { address } = req.query;
    // pool.query(`SELECT * FROM reports WHERE reportlocation LIKE '%${address}%'`, (error, results) => {
    //                 if (error) {
    //                     res.status(500).json({ error });
    //                     console.log("loi roi");
    //                     console.error(error);
    //                 } else {
    //                     res.json(results.rows);
    //                 }
    // });
    pool.query(`SELECT * FROM reports`, (error, results) => {
        if (error) {
            res.status(500).json({ error });
            console.log("loi roi");
            console.error(error);
        } else {
            res.json(results.rows);
        }
});
}

module.exports = controller;

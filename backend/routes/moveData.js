// ROUTES:
// common/fetch-employees
// common/fetch-eods 
// common/submit-eod 
// common/get-user-eods

const express = require('express');
const fetchUser = require('../middlewares/fetchUser.js');
const Report = require('../models/Report.js');
const router = express.Router();
const moveDataController = require('../controllers/moveDataController.js');
const { fetchEmployees, submitEOD, fetchUserEods } = moveDataController;



router.get('/fetch-employees-by-branch', fetchUser, fetchEmployees)


router.post('/submit-eod', fetchUser, submitEOD)


router.post('/fetch-subordinate-eods', async (req, res) => {
    try {
        const {
            begin,
            end
        } = req.body;

        const beginDate = new Date(begin);
        const endDate = new Date(end);

        const eods = await Report.find({ "empID": req.header('empID'), "date": { "$gte": beginDate, "$lt": endDate } });

        return res.json({
            success: true,
            message: "eods' list successfully fetched",
            eods: eods
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error!");
    }
})






router.post('/fetch-user-eods', fetchUser, fetchUserEods)


module.exports = router;
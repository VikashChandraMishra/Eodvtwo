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


router.get('/fetch-eods', async (req, res) => {
    try {

        const eods = await Report.find({ "empID": req.header('empID') });

        return res.json({
            "success": true,
            "message": "eods' list successfully fetched",
            "eods": eods,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).send("Internal Server Error!");

    }
})






router.get('/fetch-user-eods', fetchUser, fetchUserEods)


module.exports = router;
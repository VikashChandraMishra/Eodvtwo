// ROUTES:
// common/fetch-employees
// common/fetch-eods 
// common/submit-eod 
// common/get-user-eods

const express = require('express');
const fetchUser = require('../middlewares/fetchUser.js');
const router = express.Router();
const moveDataController = require('../controllers/moveDataController.js');
const { fetchEmployees, submitEOD, fetchUserEods, fetchSubordinateEods, fetchEmployeesByLocation } = moveDataController;


router.get('/fetch-employees-by-branch', fetchUser, fetchEmployees)


router.post('/submit-eod', fetchUser, submitEOD)


router.post('/fetch-subordinate-eods', fetchSubordinateEods)


router.post('/fetch-user-eods', fetchUser, fetchUserEods)


router.post('/fetch-employees-by-location', fetchUser, fetchEmployeesByLocation)


module.exports = router;
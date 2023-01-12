// ROUTES:
// employee/fetch-profile
// employee/fetch-submission-status

const express = require('express');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

const {
    fetchProfile,
    fetchSubmissionStats
} = employeeController;


router.get('/fetch-profile', fetchUser, fetchProfile);


router.get('/fetch-submission-status', fetchUser, fetchSubmissionStats);


module.exports = router;
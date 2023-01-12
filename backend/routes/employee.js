// ROUTES:
// employee/fetch-profile
// employee/fetch-submission-status

const express = require('express');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

const {
    fetchProfile,
    fetchApprovalStats
} = employeeController;


router.get('/fetch-profile', fetchUser, fetchProfile);


router.get('/fetch-approval-status', fetchUser, fetchApprovalStats);


module.exports = router;
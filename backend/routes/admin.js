const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser.js');
const adminController = require('../controllers/adminController.js');

const {
    register,
    fetchSubmissionStats
} = adminController;


router.post('/registration', register);


router.get('/fetch-current-submission-status', fetchUser, fetchSubmissionStats)


module.exports = router;
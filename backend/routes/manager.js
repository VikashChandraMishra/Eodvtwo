// ROUTES:
// manager/approve-eod/:id
// manager/reject-eod/:id
// manager/fetch-current-submission-status

const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser.js');
const managerController = require('../controllers/managerController.js');

const {
    approveEod,
    rejectEod,
    fetchSubmissionStats
} = managerController;


router.get('/approve-eod/:id', fetchUser, approveEod);



router.get('/reject-eod/:id', fetchUser, rejectEod);



router.get('/fetch-current-submission-status', fetchUser, fetchSubmissionStats);


module.exports = router;
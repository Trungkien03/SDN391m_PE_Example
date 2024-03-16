const express = require('express');

const courseRouter = require('./courses');
const memberRouter = require('./member');

const router = express.Router();

router.use('/course', courseRouter);
router.use('/member', memberRouter);

module.exports = router;

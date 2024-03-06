const express = require('express');
const memberRouter = require('./members');
const viewRouters = require('./views');
const sectionRouter = require('./sections');
const courseRouter = require('./courses');

const router = express.Router();

router.use('/view', viewRouters);
router.use('/member', memberRouter);
router.use('/section', sectionRouter);
router.use('/course', courseRouter);

module.exports = router;

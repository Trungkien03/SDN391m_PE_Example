const express = require('express');
const memberRouter = require('./members');
const viewRouters = require('./views');

const router = express.Router();

router.use('/member', memberRouter);
router.use('/view', viewRouters);

module.exports = router;

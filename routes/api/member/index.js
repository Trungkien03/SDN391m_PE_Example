const express = require('express');
const { signInApi } = require('../../../controllers/member.controller');

const memberRouter = express.Router();

memberRouter.post('/signIn', signInApi);

module.exports = memberRouter;

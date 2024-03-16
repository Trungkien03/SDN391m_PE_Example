const express = require('express');
const { signUp, signIn, logout } = require('../../../controllers/member.controller');

const memberRouter = express.Router();

memberRouter.post('/signUp', signUp);
memberRouter.post('/signIn', signIn);
memberRouter.get('/logout', logout);

module.exports = memberRouter;

const express = require('express');
const { viewSignUp, viewSignIn, viewDashboard } = require('../../controllers/view.controller');

const viewRouters = express.Router();

viewRouters.get('/signUp', viewSignUp);
viewRouters.get('/signIn', viewSignIn);
viewRouters.get('/dashboard', viewDashboard);

module.exports = viewRouters;

const express = require('express');
const { viewSignUp, viewSignIn, viewDashboard, viewCourses } = require('../../controllers/view.controller');

const viewRouters = express.Router();

viewRouters.get('/signUp', viewSignUp);
viewRouters.get('/signIn', viewSignIn);
viewRouters.get('/dashboard', viewDashboard);
viewRouters.get('/dashboard/courses', viewCourses);

module.exports = viewRouters;

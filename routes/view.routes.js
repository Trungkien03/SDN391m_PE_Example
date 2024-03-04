const express = require('express');
const { viewSignUp, viewSignIn, viewDashboard } = require('../controllers/view.controller');

const router = express.Router();

router.get('/signUp', viewSignUp);
router.get('/signIn', viewSignIn);
router.get('/dashboard', viewDashboard);

module.exports = router;

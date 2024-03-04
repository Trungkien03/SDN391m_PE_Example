const express = require('express');
const { updateSection } = require('../../controllers/section.controller');

const sectionRouter = express.Router();

sectionRouter.post('/update', updateSection);

module.exports = sectionRouter;

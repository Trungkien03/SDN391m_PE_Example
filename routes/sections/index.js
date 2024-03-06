const express = require('express');
const { updateSection, createSection } = require('../../controllers/section.controller');

const sectionRouter = express.Router();

sectionRouter.post('/update', updateSection);
sectionRouter.post('/create', createSection);

module.exports = sectionRouter;

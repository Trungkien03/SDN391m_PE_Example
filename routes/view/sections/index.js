const express = require('express');
const { updateSection, createSection, deleteSection } = require('../../../controllers/section.controller');

const sectionRouter = express.Router();

sectionRouter.post('/update', updateSection);
sectionRouter.post('/create', createSection);
sectionRouter.post('/delete/:sectionId', deleteSection);

module.exports = sectionRouter;

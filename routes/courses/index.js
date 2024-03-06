const express = require('express');
const { createCourse, deleteCourse, updateCourse } = require('../../controllers/course.controller');

const courseRouter = express.Router();

courseRouter.post('/create', createCourse);
courseRouter.post('/update', updateCourse);
courseRouter.get('/delete/:courseId', deleteCourse);

module.exports = courseRouter;

const express = require('express');
const {
  getAllCourses,
  updateCourseApi,
  deleteCourseApi,
  createCourseApi,
} = require('../../../controllers/course.controller');
const validateJWT = require('../../../middleware/authentication');

const courseRouter = express.Router();

courseRouter.get('/', validateJWT, getAllCourses);
courseRouter.post('/update/:courseId', validateJWT, updateCourseApi);
courseRouter.get('/delete/:courseId', validateJWT, deleteCourseApi);
courseRouter.post('/create', validateJWT, createCourseApi);

module.exports = courseRouter;

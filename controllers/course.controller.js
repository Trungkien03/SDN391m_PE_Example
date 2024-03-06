const catchAsync = require('../utils/catchAsync');
const course = require('../models/course.model');
const section = require('../models/section.model');

const createCourse = catchAsync(async (req, res, next) => {
  const { courseName, courseDescription, courseImage } = req.body;
  const renderData = {};
  const courses = await course.find({});
  renderData.title = 'Courses';
  renderData.courses = courses;

  if (!courseName || !courseDescription || !courseImage) {
    renderData.messageFail = 'Missing required fields';
    return res.status(400).render('dashboard/courses', renderData);
  }

  const newCourses = await course.create({ courseName, courseImage, courseDescription });

  const updatedCourses = await course.find({});

  renderData.courses = updatedCourses;

  renderData.messageSuccess = `Course ${newCourses.courseName} created successfully`;
  res.status(200).render('dashboard/courses', renderData);
});

const updateCourse = catchAsync(async (req, res, next) => {
  const { courseId, courseName, courseDescription, courseImage } = req.body;

  const renderData = {};
  const courses = await course.find({});
  renderData.title = 'Courses';
  renderData.courses = courses;

  const updatedCourse = await course.findByIdAndUpdate(courseId, { courseName, courseImage, courseDescription });
  const updatedCourses = await course.find({});
  renderData.courses = updatedCourses;

  renderData.messageSuccess = `Course ${updatedCourse.courseName} updated successfully`;
  res.status(200).render('dashboard/courses', renderData);
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const renderData = {};
  const courses = await course.find({});
  renderData.title = 'Courses';
  renderData.courses = courses;

  if (!courseId) {
    renderData.messageFail = 'Missing required courseId';
    return res.status(400).render('dashboard/courses', renderData);
  }

  const findCourse = await course.findById(courseId);

  if (!findCourse) {
    renderData.messageFail = `Cannot find course with courseID ${courseId} `;
    return res.status(400).render('dashboard/courses', renderData);
  }

  await course.findByIdAndDelete(courseId);

  await section.deleteMany({ course: courseId });

  const updatedCourses = await course.find({});
  renderData.courses = updatedCourses;

  renderData.messageSuccess = `Course ${findCourse.courseName} deleted successfully`;
  res.status(200).render('dashboard/courses', renderData);
});

module.exports = { createCourse, updateCourse, deleteCourse };

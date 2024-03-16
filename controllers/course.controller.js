const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const catchAsync = require('../utils/catchAsync');
const course = require('../models/course.model');
const section = require('../models/section.model');

dotenv.config();

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
  res.status(200).render('/view/dashboard/courses', renderData);
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
  res.status(200).render('view/dashboard/courses', renderData);
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const renderData = {};
  const courses = await course.find({});
  renderData.title = 'Courses';
  renderData.courses = courses;

  if (!courseId) {
    renderData.messageFail = 'Missing required courseId';
    return res.status(400).render('view/dashboard/courses', renderData);
  }

  const findCourse = await course.findById(courseId);

  if (!findCourse) {
    renderData.messageFail = `Cannot find course with courseID ${courseId} `;
    return res.status(400).render('view/dashboard/courses', renderData);
  }

  await course.findByIdAndDelete(courseId);

  await section.deleteMany({ course: courseId });

  const updatedCourses = await course.find({});
  renderData.courses = updatedCourses;

  renderData.messageSuccess = `Course ${findCourse.courseName} deleted successfully`;
  res.status(200).render('view/dashboard/courses', renderData);
});

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await course.find({});

    if (courses.length === 0) {
      return res.status(404).json({
        message: 'No courses found',
      });
    }

    res.status(200).json({
      message: 'Get All Courses Successfully',
      data: courses,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateCourseApi = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { courseName, courseDescription, courseImage } = req.body;

    const updatedCourse = await course.findByIdAndUpdate(courseId, { courseName, courseImage, courseDescription });

    if (!updatedCourse) {
      res.status(404).json({
        message: `Not found course with ID: ${courseId}`,
      });
    }

    res.status(200).json({
      message: 'update Course Successfully',
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCourseApi = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      res.status(500).json({
        message: 'Please Provide Course ID',
      });
    }

    const deletedCourse = await course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      res.status(404).json({
        message: `Not found course with ID: ${courseId}`,
      });
    }

    res.status(200).json({
      message: `delete Course ${deleteCourse.name} Successfully `,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createCourseApi = async (req, res, next) => {
  try {
    const { courseName, courseDescription, courseImage } = req.body;

    if (!courseName || !courseDescription || !courseImage) {
      return res.status(400).json({
        message: 'Please provide enough data to create course',
      });
    }

    const createdCourse = await course.create({ courseName, courseImage, courseDescription });

    return res.status(200).json({
      message: 'Course created successfully',
      data: createdCourse,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = createCourseApi;

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  updateCourseApi,
  deleteCourseApi,
  createCourseApi,
};

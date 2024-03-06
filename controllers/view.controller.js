const course = require('../models/course.model');
const member = require('../models/member.model');
const section = require('../models/section.model');
const catchAsync = require('../utils/catchAsync');

const viewSignUp = (req, res, next) => {
  res.status(200).render('authentication/signUp', { title: 'Sign Up Page' });
};

const viewSignIn = (req, res, next) => {
  res.status(200).render('authentication/signIn', { title: 'Sign In Page' });
};

const viewDashboard = catchAsync(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return res.redirect('/view/signIn');
  }
  const courses = await course.find({});
  const users = await member.find({});
  const sections = await section.find({}).populate({ path: 'course' }).exec();

  const renderData = {
    title: 'Dashboard',
    sections,
    courses,
    courseLength: courses.length,
    sectionLength: sections.length,
    memberLength: users.length,
  };

  res.status(200).render('dashboard/home', renderData);
});

const viewCourses = catchAsync(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return res.redirect('/view/signIn');
  }
  const courses = await course.find({});
  const users = await member.find({});
  const sections = await section.find({}).populate({ path: 'course' }).exec();

  const renderData = {
    title: 'Courses',
    sections,
    courses,
    courseLength: courses.length,
    sectionLength: sections.length,
    memberLength: users.length,
  };

  res.status(200).render('dashboard/courses', renderData);
});

module.exports = { viewSignUp, viewSignIn, viewDashboard, viewCourses };

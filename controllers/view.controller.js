const course = require('../models/course.model');
const member = require('../models/member.model');
const section = require('../models/section.model');

const viewSignUp = (req, res, next) => {
  res.status(200).render('authentication/signUp');
};

const viewSignIn = (req, res, next) => {
  res.status(200).render('authentication/signIn');
};

const viewDashboard = async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return res.redirect('/view/signIn');
  }
  const courses = await course.find({});
  const users = await member.find({});

  const sections = await section
    .find({})
    .populate({
      path: 'course',
    })
    .exec();

  res.status(200).render('dashboard/home', {
    title: 'Dashboard',
    sections,
    courseLength: courses.length,
    sectionLength: sections.length,
    memberLength: users.length,
  });
};

module.exports = { viewSignUp, viewSignIn, viewDashboard };

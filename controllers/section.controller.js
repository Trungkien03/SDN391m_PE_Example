const course = require('../models/course.model');
const member = require('../models/member.model');
const section = require('../models/section.model');
const catchAsync = require('../utils/catchAsync');

const updateSection = catchAsync(async (req, res, next) => {
  const { sectionId, sectionName, sectionDescription, duration, course: courseId } = req.body;
  const courses = await course.find({});
  const users = await member.find({});
  const sections = await section.find({}).populate({ path: 'course' }).exec();

  const renderData = {};
  renderData.title = 'Dashboard';
  renderData.sections = sections;
  renderData.courses = courses;
  renderData.courseLength = courses.length;
  renderData.sectionLength = sections.length;
  renderData.memberLength = users.length;

  if (!sectionId || !sectionName || !sectionDescription || !duration || !courseId) {
    renderData.messageFail = 'Missing required fields';
    return res.status(400).render('dashboard/home', renderData);
  }

  const existingSection = await section.findById(sectionId);

  if (!existingSection) {
    renderData.messageFail = 'Section not found';
    return res.status(404).render('dashboard/home', renderData);
  }

  existingSection.sectionName = sectionName;
  existingSection.sectionDescription = sectionDescription;
  existingSection.duration = duration;
  existingSection.course = courseId;

  await existingSection.save();

  renderData.messageSuccess = 'Section updated successfully';
  res.status(200).render('dashboard/home', renderData);
});

module.exports = { updateSection };

module.exports = { updateSection };

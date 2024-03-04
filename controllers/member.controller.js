const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const member = require('../models/member.model');

dotenv.config();

const signUp = catchAsync(async (req, res, next) => {
  const { username, fullName, password, confirm, imageUrl } = req.body;

  if (!username || !fullName || !password) {
    return res
      .status(400)
      .render('authentication/signUp', { message: 'Username, full name, and password are required' });
  }

  if (password !== confirm) {
    return res.status(400).render('authentication/signUp', { message: 'Password and confirm password do not match' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await member.create({
    username,
    fullName,
    password: hashedPassword,
    imageUrl,
  });

  res.status(201).render('authentication/signUp', { message: 'Sign up successful, Please login to go dashboard' });
});

const signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).render('authentication/signIn', { message: 'Username and password are required' });
  }

  const existingMember = await member.findOne({ username });

  if (!existingMember) {
    return res.status(401).render('authentication/signIn', { message: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, existingMember.password);

  if (!passwordMatch) {
    return res.status(401).render('authentication/signIn', { message: 'Invalid username or password' });
  }

  // Generate token
  const token = jwt.sign({ existingMember }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Set token in cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  res.redirect('/view/dashboard');
});

const logout = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  console.log(token);

  if (!token) {
    return res.redirect('/view/signIn');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);

  res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
  res.status(200).render('authentication/signIn', { message: 'Logout Successfully!' });
});

module.exports = { signUp, signIn, logout };

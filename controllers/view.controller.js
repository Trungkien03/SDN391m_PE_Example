const viewSignUp = (req, res, next) => {
  res.status(200).render('authentication/signUp');
};

const viewSignIn = (req, res, next) => {
  res.status(200).render('authentication/signIn');
};

const viewDashboard = (req, res, next) => {
  res.status(200).render('dashboard/home', { title: 'Dashboard' });
};

module.exports = { viewSignUp, viewSignIn, viewDashboard };

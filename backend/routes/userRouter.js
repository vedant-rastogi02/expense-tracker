const express = require('express');
const UserRouter = express.Router();
const usersControl = require('../controllers/userCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');

UserRouter.post('/api/v1/users/register', usersControl.register);
UserRouter.post('/api/v1/users/login', usersControl.login);
UserRouter.get('/api/v1/users/profile', isAuthenticated, usersControl.profile);
UserRouter.put('/api/v1/users/update-profile', isAuthenticated, usersControl.UpdateUserProfile);
UserRouter.put('/api/v1/users/profile/password', isAuthenticated, usersControl.ChangeUserPassword)

module.exports = UserRouter;

// pass=12345
// user-tony1
// gmail- tony1@gmail.com
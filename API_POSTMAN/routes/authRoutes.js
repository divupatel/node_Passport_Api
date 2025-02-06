
const express = require('express')

const routes = express.Router();
const authCtl = require('../controllers/authController');

routes.post('/signUp',authCtl.signUp);
routes.post('/signIn',authCtl.signIn);


module.exports = routes;

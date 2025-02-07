
const express = require('express')

const routes = express.Router();
const homeCtl = require('../controllers/homeController');
const User = require('../models/UserModel')
const passport = require('passport');

routes.get('/',passport.authenticate('jwt',{failureRedirect : '/unAuth'}),homeCtl.viewData);
routes.get('/unAuth', async(req,res)=>{
    return res.status(400).json({
        msg : "You are Unauthorized ... Login First to be Authorized"
    })
});
routes.post('/addData',passport.authenticate('jwt',{failureRedirect : '/unAuth'}),User.uploadImage,homeCtl.addData);
routes.delete('/deleteData/:id',passport.authenticate('jwt',{failureRedirect : '/unAuth'}),homeCtl.deleteData);
routes.get('/getSingleData',passport.authenticate('jwt',{failureRedirect : '/unAuth'}),homeCtl.getSingleData);
routes.put('/updateData/:id',passport.authenticate('jwt',{failureRedirect : '/unAuth'}),User.uploadImage,homeCtl.updateData);

routes.use('/auth',require('./authRoutes'));

module.exports = routes;

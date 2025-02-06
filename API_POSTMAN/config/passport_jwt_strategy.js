const passport = require('passport');

const jStrategy = require('passport-jwt').Strategy;
const eJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest : eJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "Divu"
}
const Auth = require('../models/AuthModel');

passport.use(new jStrategy(opts, async function (payload,done) {
    console.log(payload);
    let checkUserData = await Auth.findOne({email : payload.userData.email});
    if(checkUserData){
        return done(null,checkUserData);
    }
    else{
        return done(null,false);
    }
}))



passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    let userdata = await Auth.findById(id);
    if(userdata){
        return done(null,userdata)
    }
    else{
        return done(null,false)
    }
});

module.exports = passport;
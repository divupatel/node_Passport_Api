const Auth = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req,res)=>{
    try{
        let checkEmail = await Auth.find({email : req.body.email}).countDocuments();
        if(checkEmail == 0){
            if(req.body.password == req.body.confirmPassword){
                req.body.password = await bcrypt.hash(req.body.password,10);
                let signUp = await Auth.create(req.body);
                if(signUp) {
                    return res.status(400).json({
                        msg : "Auther Register Successfully",
                        data : signUp
                    })
                }
                else{
                    return res.status(400).json({
                        msg : "User not Register",
                    })
                }
            }
            else{
                return res.status(400).json({
                    msg : "Password and Confirm Password not Match",
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "Email already Exist",
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            'msg': "Something is Wrong",
            error: err
        })
    }
}

module.exports.signIn = async (req,res) => {
    try{
        console.log(req.body);
        let checkEmail = await Auth.findOne({email : req.body.email});
        if(checkEmail){
            let checkPass = await bcrypt.compare(req.body.password,checkEmail.password);
            if(checkPass){
                let token = await jwt.sign({userData : checkEmail},'Divu');
                return res.status(200).json({
                    msg : "Sign In Successfully",
                    data : token
                })
            }
            else{
                return res.status(400).json({
                    msg : "Invalid Password",
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "Email not found",
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            'msg': "Something is Wrong",
            error: err
        })
    }
}
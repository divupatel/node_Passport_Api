const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imagePath = '/uploads/user'

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    }
    ,
    city : {
        type : String,
        required : true
    },
    userImage : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    }
},
{
    timestamps : true
});

const storageImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

UserSchema.statics.uploadImage = multer({storage:storageImage}).single('image');
UserSchema.statics.imgPath = imagePath;


const User = mongoose.model('User',UserSchema);
module.exports = User;
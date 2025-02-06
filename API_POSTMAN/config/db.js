const mongoose = require('mongoose');

mongoose.connect( 'mongodb://127.0.0.1:27017/apiData');

const db = mongoose.connection;


db.once('open',(err)=>{
    if(err){
        console.log("Something is wrong",err);
    }
    console.log("Db is connected")
});

module.exports = db;

const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs');
module.exports.viewData = async (req, res) => {
    try {
        let getUser = await User.find();
        if (getUser) {
            return res.status(200).json({
                msg: "Data found successfully",
                data: getUser
            })
        }
        else {
            return res.status(200).json({
                msg: "Data not Found",
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            msg: "Something is Wrong",
            error: err
        })
    }
}

module.exports.addData = async (req, res) => {
    try {
        var image = '';
        if (req.file) {
            image = User.imgPath + '/' + req.file.filename;
        }
        req.body.userImage = image;
        let userData = await User.create(req.body);
        if (userData) {
            return res.status(200).json({
                msg: "Data added successfully",
                data: userData
            })
        }
        else {
            return res.status(200).json({
                msg: "Data not added",
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

module.exports.deleteData = async (req, res) => {
    try {

        let findData = await User.findById(req.params.id);
        if (findData) {
            try {
                var imgPath = path.join(__dirname, '..', findData.userImage);
                await fs.unlinkSync(imgPath);
            }
            catch (err) {
                console.log("Image not found", err)
            }

            let deleteData = await User.findByIdAndDelete(req.params.id);
            if (deleteData) {
                return res.status(200).json({
                    msg: "Data deleted successfully",
                })
            }
            else {
                return res.status(200).json({
                    msg: "Data not found",
                })
            }
        }
        else{
            return res.status(200).json({
                msg: "No Data found",
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

module.exports.getSingleData = async (req, res) => {
    try {
        let singleData = await User.findById(req.query.dataId);
        if (singleData) {
            return res.status(200).json({
                msg: "Record found successfully",
                data: singleData
            })
        }
        else {
            return res.status(200).json({
                msg: "Record not Found",
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

module.exports.updateData = async (req, res) => {
    try {
        let checkData = await User.findById(req.params.id);
        if (checkData) {
            if(req.file){
                let findData = await User.findById(req.params.id);
                if (findData) {
                    try {
                        var imgPath = path.join(__dirname, '..', findData.userImage);
                        await fs.unlinkSync(imgPath);
                    }
                    catch (err) {
                        console.log("Image not found", err)
                    }

                    req.body.userImage = User.imgPath+'/'+req.file.filename
            }
            else{
                let findData = await User.findById(req.params.id);
                req.body.userImage = findData.userImage
            }

            let updatedData = await User.findByIdAndUpdate(checkData._id, req.body);
            if (updatedData) {
                let latestUpdate = await User.findById(updatedData._id);
                if (latestUpdate) {
                    return res.status(200).json({
                        msg: "Record Updated and Here is the latest updated record",
                        data: latestUpdate
                    })
                }
                else {
                    return res.status(200).json({
                        msg: "Record not Updated and founded",
                        data: updatedData
                    })
                }
            }
            else {
                return res.status(200).json({
                    msg: "Record not Updated",
                })
            }
        }
        else {
            return res.status(200).json({
                msg: "Record not Found",
            })
        }

    }
}
    catch (err) {
        return res.status(400).json({
            'msg': "Something is Wrong",
            error: err
        })
    }
}
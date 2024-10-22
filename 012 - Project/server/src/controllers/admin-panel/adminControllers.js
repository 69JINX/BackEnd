// Admin Controllers

const fs = require('fs');
const path = require('path');

const AdminModel = require("../../models/adminModel");

const testAdmin = (req, res) => {
    res.status(200).json({ message: 'test successful' });
};

const registerAdmin = async () => {
    try {
        const isAvailable = await AdminModel.findOne({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        })

        if (isAvailable) return console.log(isAvailable);

        if (!isAvailable) {
            const data = new AdminModel({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD
            })
            const response = await data.save();
            console.log(response);
        }
    }
    catch (error) {
        console.log(error)
    }
}

const adminLogin = async (req, res) => {
    try {
        const ifAdmin = await AdminModel.findOne({
            email: req.body.email
        })
        if (!ifAdmin) return res.status(404).json({ message: 'Invalid Email address' });
        if (ifAdmin.password !== req.body.password) return res.status(400).json({ message: 'Invalid Password' });

        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/admin/`;

        const adminObj = ifAdmin.toObject();
        /*
        Mongoose documents are instances of Mongoose's Document class, not plain JavaScript objects. These instances have a lot of internal machinery (like validation, getters/setters) that can affect how modifications are handled.
        Using .toObject() or .lean() ensures that you're working with a plain JavaScript object where your modifications are clearly visible when logged.
        In summary, converting the Mongoose document to a plain object using .toObject() or .lean() will allow you to see your added filepath in the console.log.
         */

        adminObj.filepath = filepath;
        res.status(200).json({ message: 'success Login', data: adminObj });
        console.log(ifAdmin);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error', error })
    }
}

const updateAdmin = async (req, res) => {
    try {

        const oldData = await AdminModel.findById(req.params._id);
        console.log(oldData);
        const data = req.body;
        if (req.files) {
            if (req.files.logo) {
                data.logo = req.files.logo[0].filename;
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.logo))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.logo));
                    }  
            }
            if (req.files.favicon) {
                data.favicon = req.files.favicon[0].filename;
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.favicon))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.favicon));
                    } 
            }
            if (req.files.footer_icon) {
                data.footer_icon = req.files.footer_icon[0].filename;
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.footer_icon))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.footer_icon));
                    }
            }
            if (req.files.profileImg) {
                data.profileImg = req.files.profileImg[0].filename;
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.profileImg))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'admin', oldData.profileImg));
                    }
            }
        }
        console.log(data);
        const response = await AdminModel.findByIdAndUpdate(req.params._id, data)
        res.status(200).json({ message: 'success updated', data: response });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { testAdmin, registerAdmin, adminLogin, updateAdmin };
// Admin Controllers

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
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
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

const generateOTP = async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.PASS
            }
        })

        // mail with html attribute, but if included, will overwrite the text attribute

        const info = await transporter.sendMail({
            from: '"Frank and Oak" <frankandoak@gmail.com>',
            to: 'avimationss39228@gmail.com',
            subject: 'OTP for Email Change for Frank and Oak',
            text: ``, // can't add html
            body: `<i><b>Your OTP is : ${otp}</b></i>`, // doesn't show anywhere in the mail
            html: `
            <!doctype html> <html lang="en">
            <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>OTP Email Template</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <link rel="stylesheet" href="/style.css"> <style> body {font-family: Arial, sans-serif;background-color: #f4f4f4;padding: 0;margin: 0}.container-sec {background-color: #ffffff;border-radius: 8px;padding: 20px;margin-top: 30px;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);max-width: 600px;} .otp-code { font-size: 24px; font-weight: bold; background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px; border: 1px dashed #007bff; color: #007bff; } .footer-text { color: #6c757d; font-size: 14px; text-align: center; margin-top: 20px; } .footer-text a { color: #007bff; text-decoration: none; } .otp-lock { color: #333; font-size: 80px; } .welcome-section { background: #144fa9db; padding: 30px; border-radius: 4px; color: #fff; font-size: 20px; margin: 20px 0px; }i.fas.fa-envelope-open { font-size: 35px !important; color: #ffffff; } </style> </head>
            <body> <div class="container-sec"> <div class="text-center"><h2 class="text-center">Hello</h2> <p>Your One-Time Password (OTP) for verification is:</p> <div class="otp-code">${otp}</div> <p class="mt-4">Please use this OTP to complete your verification. The OTP is valid for the next 10 minutes.</p> </div> <div class="footer-text"> <p>If you did not request this OTP, please <a href="#">contact us</a> immediately.</p> <p>Thank you, <br>Frank And Oak Team</p> </div> </div> </body> </html>`
        })
        res.status(200).json({ message: "OTP Send Successfully", info });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

module.exports = { testAdmin, registerAdmin, adminLogin, updateAdmin, generateOTP };
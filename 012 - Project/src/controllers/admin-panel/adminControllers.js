// Admin Controllers

const AdminModel = require("../../models/adminModel");

const testAdmin = (req, res) => {
    res.status(200).json({ message: 'test successful' })
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

module.exports = { testAdmin, registerAdmin };
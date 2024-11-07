const UserModel = require("../../models/userModel");

const registerUser = async (req, res) => {
    try {
        const isAvailable = await UserModel.findOne({ email: req.body.email });
        console.log(isAvailable);
        if (!isAvailable) {
            const data = new UserModel(req.body);
            const response = await data.save();
            console.log(response);
        }
        res.status(200).json({ message: 'success', data: isAvailable });
    }
    catch (error) {
        console.log(error);

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const isAvailable = await UserModel.findOne({ email: req.body.email });
        if (isAvailable) {
            if (isAvailable.password === req.body.password) {
                return res.status(200).json({ message: 'success', data: isAvailable });
            }
            else{
                return res.status(403).json({ message: 'incorrect password', data: null });
            }
        }
        res.status(404).json({ message: 'user not found! Please Register', data: null });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    registerUser,
    loginUser
}
const colorModel = require("../../models/colorModel");

const addColor = async (req, res) => {
    try {
        console.log('hello')
        console.log(req.body);
        const dataToSave = new colorModel(req.body);
        const savedData = await dataToSave.save();
        res.status(200).json({ message: 'Color Controller', data: savedData });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Color already exists." });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readColor = async (req, res) => {
    try {
        const data = await colorModel.find();
        res.status(200).json({ message: 'Success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateStatusColor = async (req, res) => {
    try {
        const response = await colorModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

module.exports = { addColor, readColor, updateStatusColor }
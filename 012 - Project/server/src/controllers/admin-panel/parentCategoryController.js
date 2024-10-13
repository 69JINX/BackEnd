const parentCategoryModel = require("../../models/parentCategoryModel");

const createParentCategory = async (req, res) => {
    try {
        console.log(req.body);
        const dataToSave = new parentCategoryModel(req.body);
        const savedData = await dataToSave.save();
        res.status(200).json({ message: 'Parent Category Controller', data: savedData });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Category already exists." });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readParentCategory = async (req, res) => {
    try {
        const data = await parentCategoryModel.find();
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const updateStatusParentCategory = async (req, res) => {
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

module.exports = { createParentCategory, readParentCategory, updateStatusParentCategory };
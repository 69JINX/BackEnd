const parentCategoryModel = require("../../models/parentCategoryModel");

const parentCategoryController = async (req, res) => {
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

module.exports = parentCategoryController;
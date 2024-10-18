const productCategoryModel = require("../../models/productCategoryModel");

const createProductCategory = async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename
        }
        const dataToSave = new productCategoryModel(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: 'successful', data: response });
    }
    catch (error) {
        console.log(error);
        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal server error' })
    }
}

const readProductCategory = async (req, res) => {
    try {
        const data = await productCategoryModel.find();
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel`;
        res.status(200).json({ message: 'successful', data, filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { createProductCategory, readProductCategory };
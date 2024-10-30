const parentCategoryModel = require("../../models/parentCategoryModel");
const productCategoryModel = require("../../models/productCategoryModel");
const productModel = require("../../models/productModel");

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

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readParentCategory = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ deleted_at: null });
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

const deleteParentCategory = async (req, res) => { // soft delete
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deleteParentCategories = async (req, res) => {
    try {
        const response = await parentCategoryModel.updateMany(
            { _id: req.body.checkedCategoriesIDs }, {
            $set: {
                deleted_at: Date.now()
            }
        });
        res.status(200).json({ message: 'Successfully Deleted', response });
        // console.log(req.body.checkedCategoriesIDs);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const parentCategoryByID = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ _id: req.params._id });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
    }
}

const updateParentCategory = async (req, res) => {
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id,
            {
                name: req.body.name,
                description: req.body.description
            })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Category already exists." });
        }
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deletedParentCategories = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ deleted_at: { $ne: null } });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverParentCategory = async (req, res) => {
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const activatedParentCategories = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ status: true, deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const permanentDeleteParentCategory = async (req, res) => {
    try {
        await productModel.deleteMany({ parent_category: req.params._id })
        await productCategoryModel.deleteMany({ parent_category: req.params._id })
        await parentCategoryModel.deleteOne(req.params);

        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}


module.exports = {
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteParentCategories,
    parentCategoryByID,
    updateParentCategory,
    deletedParentCategories,
    recoverParentCategory,
    activatedParentCategories,
    permanentDeleteParentCategory
};
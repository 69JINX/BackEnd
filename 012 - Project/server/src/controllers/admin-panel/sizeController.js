const sizeModel = require("../../models/sizeModel");


const createSize = async (req, res) => {
    try {
        console.log(req.body);
        const dataToSave = new sizeModel(req.body);
        const savedData = await dataToSave.save();
        res.status(200).json({ message: 'Size Controller', data: savedData });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Size already exists." });
        }
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readSize = async (req, res) => {
    try {
        const data = await sizeModel.find({ deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const updateStatusSize = async (req, res) => {
    try {
        const response = await sizeModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteSize = async (req, res) => {
    try {
        const response = await sizeModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deleteSizes = async (req, res) => {
    try {
        const response = await sizeModel.updateMany(
            { _id: req.body.checkedSizeIDs }, {
            $set: {
                deleted_at: Date.now()
            }
        });
        res.status(200).json({ message: 'Successfully Deleted', response });

    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const sizeByID = async (req, res) => {
    try {
        const data = await sizeModel.find({ _id: req.params._id });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
    }
}

const updateSize = async (req, res) => {
    try {
        const response = await sizeModel.findByIdAndUpdate(req.params._id,
            {
                name: req.body.name,
                order: req.body.order
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

const deletedSizes = async (req, res) => {
    try {
        const data = await sizeModel.find({ deleted_at: { $ne: null } });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverSize = async (req, res) => {
    try {
        const response = await sizeModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const activatedSizes = async (req, res) => {
    try {
        const data = await sizeModel.find({ status: true, deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

module.exports = {
    createSize,
    readSize,
    updateStatusSize,
    deleteSize,
    deleteSizes,
    sizeByID,
    updateSize,
    deletedSizes,
    recoverSize,
    activatedSizes
};
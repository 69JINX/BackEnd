const productModel = require("../../models/productModel");

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.image_on_hover) data.image_on_hover = req.files.image_on_hover[0].filename;
            if (req.files.gallery) data.gallery = req.files.gallery.map(img => img.filename);
        }

        const dataToSave = new productModel(data);
        const savedData = await dataToSave.save();
        res.status(200).json({ message: 'product added', data: savedData });
    }
    catch (error) {


        // console.log(error);
        // if (error.errors.price.kind || error.errors.mrp.kind ) {
        //     if (error.errors.price.kind == 'Number' || error.errors.mrp.kind == 'Number') return res.status(400).json({ message: 'price/mrp should be in a Number!' })
        // }
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Product already exists." });
        }

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })

        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const readProduct = async (req, res) => {
    try {
        const data = await productModel.find().populate('parent_category').populate('product_category').populate('size').populate('color');
        res.status(200).json({ message: data });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { createProduct, readProduct }

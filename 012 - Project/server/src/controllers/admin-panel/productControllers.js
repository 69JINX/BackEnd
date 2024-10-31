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

        if (error.errors) {
            if (error.errors.price && error.errors.price.kind == 'Number' || error.errors.mrp && error.errors.mrp.kind == 'Number') return res.status(400).json({ message: 'price/mrp should be in a Number!' })
        }

        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Product with the same name already exists." });
        }

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const readProducts = async (req, res) => {
    try {
        const data = await productModel.find({ deleted_at: null }).populate('parent_category').populate('product_category').populate('size').populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product/`;

        res.status(200).json({ message: 'successful', data, filepath });

        /*
        
        const products = await productModel.find({ deleted_at: null }).populate('parent_category').populate('product_category').populate('size').populate('color').lean();
        // Using .lean() with mongoose queries will make Mongoose skip the creation of a full Mongoose document(with our data being in _doc key when trying to add new key in the returned result from mongoose query), instead returning a plain JavaScript object. We needed to add a new key(filepath) to every product we get but adding a new key map on all products, the data wasn't reaching in front-end in appropriate format but in with some newly unwanted keys and our data being in '_doc' key.  https://stackoverflow.com/questions/18821212/mongoose-whats-up-with-doc
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product/`;

        const data = products.map((product) => ({ ...product, filepath: filepath }));
        res.status(200).json({ message: 'successful', data });

        */
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateStatusProduct = async (req, res) => {
    try {
        const response = await productModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteProduct = async (req, res) => { // soft delete
    try {
        const response = await productModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deletedProducts = async (req, res) => {
    try {
        const data = await productModel.find({ deleted_at: { $ne: null } }).populate('parent_category').populate('product_category').populate('size').populate('color');
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteProducts = async (req, res) => {
    try {
        const response = await productModel.updateMany(
            { _id: req.body.checkedProductsIDs }, {
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


const recoverProduct = async (req, res) => {
    try {
        const response = await productModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const readProductByID = async (req, res) => {
    try {
        const data = await productModel.find(req.params).populate('parent_category').populate('product_category').populate('size').populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product/`;

        res.status(200).json({ message: 'successful', data, filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const permanentDeleteProduct = async (req, res) => {
    try {
        const data = await productModel.deleteOne(req.params); // The deleteOne method in Mongoose only returns information about the delete operation's success but does not provide the details of the deleted document itself. To get the details of the deleted document, you can use findOneAndDelete instead, which will delete the document and return its details in a single operation
        res.status(200).json({ message: 'product deleted permanently', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = {
    createProduct,
    readProducts,
    permanentDeleteProduct,
    updateStatusProduct,
    deleteProduct,
    deletedProducts,
    recoverProduct,
    deleteProducts,
    readProductByID
}


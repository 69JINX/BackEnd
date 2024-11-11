const productModel = require("../../models/productModel");

const activeProductsForWebsite = async (req, res) => {
    try {
        const products = await productModel.find({ status: true, deleted_at: null }).populate('parent_category').populate('product_category').populate('size').populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({ message: 'Success', data: products, filepath: filepath });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { activeProductsForWebsite }
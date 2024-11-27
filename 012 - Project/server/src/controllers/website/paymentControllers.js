const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

const checkout = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { checkout }
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    iShopFor: { type: String, default: 'All' }
})

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
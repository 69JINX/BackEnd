const { testAdmin, adminLogin, registerAdmin } = require('./admin-panel/adminControllers')
const { addColor, readColor, updateStatusColor } = require('./admin-panel/colorController')
const { createParentCategory, readParentCategory, updateStatusParentCategory } = require('./admin-panel/parentCategoryController')
module.exports = {
    testAdmin,
    adminLogin,
    registerAdmin,
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    addColor,
    readColor,
    updateStatusColor
}
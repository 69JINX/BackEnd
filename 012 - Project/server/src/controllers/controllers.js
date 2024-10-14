const { testAdmin, adminLogin, registerAdmin } = require('./admin-panel/adminControllers')
const { addColor, readColor, updateStatusColor } = require('./admin-panel/colorController')
const { createParentCategory, readParentCategory, updateStatusParentCategory } = require('./admin-panel/parentCategoryController')
const { createSize, readSize, updateStatusSize } = require('./admin-panel/sizeController')
module.exports = {
    testAdmin,
    adminLogin,
    registerAdmin,
    createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    addColor,
    readColor,
    updateStatusColor,
    createSize,
    readSize,
    updateStatusSize
}
const { testAdmin, adminLogin, registerAdmin } = require('./admin-panel/adminControllers')
const { addColor, readColor, updateStatusColor, deleteColor, deleteColors } = require('./admin-panel/colorController')
const { createParentCategory, readParentCategory, updateStatusParentCategory, deleteParentCategory, deleteParentCategories } = require('./admin-panel/parentCategoryController')
const { createSize, readSize, updateStatusSize, deleteSize, deleteSizes } = require('./admin-panel/sizeController')
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
    updateStatusSize,
    deleteParentCategory,
    deleteParentCategories,
    deleteColor,
    deleteColors,
    deleteSize,
    deleteSizes
}
const { testAdmin, adminLogin, registerAdmin } = require('./admin-panel/adminControllers')
const { addColor, readColor, updateStatusColor, deleteColor, deleteColors, colorByID, updateColor } = require('./admin-panel/colorController')
const { createParentCategory, readParentCategory, updateStatusParentCategory, deleteParentCategory, deleteParentCategories, parentCategoryByID, updateParentCategory } = require('./admin-panel/parentCategoryController')
const { createSize, readSize, updateStatusSize, deleteSize, deleteSizes, sizeByID, updateSize } = require('./admin-panel/sizeController')
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
    deleteSizes,
    parentCategoryByID,
    updateParentCategory,
    colorByID,
    updateColor,
    sizeByID,
    updateSize
}
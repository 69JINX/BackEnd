const { testAdmin, adminLogin, registerAdmin } = require('./admin-panel/adminControllers')
const { createParentCategory, readParentCategory, updateStatusParentCategory } = require('./admin-panel/parentCategoryController')
module.exports = { testAdmin, adminLogin, registerAdmin, createParentCategory, readParentCategory,updateStatusParentCategory }
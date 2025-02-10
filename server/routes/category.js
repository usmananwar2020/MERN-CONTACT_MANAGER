const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { createNewCategory, updateCategory, deleteCategory, getIdBaseCategory, getAllCategory } = require('../controller/category');
const { Validate } = require('../validator/category');


// Get categories
router.get('/', auth, getAllCategory)

// Get category by Id
router.get('/:id', auth, getIdBaseCategory)

// Create category
router.post('/', [auth, admin], Validate,  createNewCategory);

//Update category
router.put('/:id', [auth, admin],Validate, updateCategory);

//Delete category
router.delete('/:id', [auth, admin], deleteCategory)

module.exports = router;

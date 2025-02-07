const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Category, Validate} = require('../models/category');
const { createNewCategory, updateCategory, deleteCategory, getIdBaseCategory, getAllCategory } = require('../controller/category');


// Get categories
router.get('/', auth, getAllCategory)

// Get category by Id
router.get('/:id', auth, getIdBaseCategory)

// Create category
router.post('/', [auth, admin], createNewCategory);

//Update category
router.put('/:id', [auth, admin], updateCategory);

//Delete category
router.delete('/:id', [auth, admin], deleteCategory)

module.exports = router;

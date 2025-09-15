const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { createNewContact, updateContact, deleteContact, getIdBaseContact, getAllcontacts, addToFavorite, getAllFavouriteContacts } = require('../controller/contact');
const { Validate } = require('../validator/contact');

//Get all contact
router.get('/', [auth, admin], getAllcontacts)

//Get all favorite contact
router.get('/favorites', auth, getAllFavouriteContacts)

//Get contact on the bases of contact ID
router.get('/:id', [auth, admin], getIdBaseContact)

// Create new contact
router.post('/', auth, Validate, createNewContact)

// Update new contact
router.put('/:id', auth, Validate, updateContact)

//Delete contact
router.delete('/:id', auth, deleteContact)

// Add to favorite
router.put('/favorite/:id', auth, addToFavorite)

module.exports = router;
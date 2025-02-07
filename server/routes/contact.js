const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { createNewContact, updateContact, deleteContact, getIdBaseContact, getAllcontacts } = require('../controller/contact');

//Get all contact
router.get('/', [auth, admin], getAllcontacts)

//Get contact on the bases of contact ID
router.get('/:id', [auth, admin], getIdBaseContact)

// Create new contact
router.post('/', auth, createNewContact)

// Update new contact
router.put('/:id', auth, updateContact)

//Delete contact
router.delete('/:id', auth, deleteContact)

module.exports = router;
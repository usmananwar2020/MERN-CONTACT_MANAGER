const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Contact, Validate} = require('../models/contact');
const admin = require('../middleware/admin');

//Get all contact
router.get('/', [auth, admin], async (req, res) => {
    const searchParams = req.query;
    // const count = await Contact.estimatedDocumentCount(); // Contact.estimatedDocumentCount return the total length the document in the table.
    const query = {}
    if(searchParams.search){
        query.$or = [
            {firstname: { $regex: new RegExp(searchParams.search, 'i') }},
            {lastname: { $regex: new RegExp(searchParams.search, 'i') }},
            {email: { $regex: new RegExp(searchParams.search, 'i') }},
            {phone: { $regex: new RegExp(searchParams.search, 'i') }},
            {address: { $regex: new RegExp(searchParams.search, 'i') }},
            {category: { $regex: new RegExp(searchParams.search, 'i') }},
        ]
    }
    let myContacts = [];
    
    if (parseInt(searchParams.limit) !== -1) {

        if(req.contact.isAdmin){
            myContacts = await Contact.find(query)
            .populate('userId')
            .skip(parseInt(searchParams.page) ? ((searchParams.page - 1) * searchParams.limit) : 0 )
            .limit(parseInt(searchParams.limit) ? searchParams.limit : 10)
        } else {
            query.userId= req.contact._id;
            myContacts = await  Contact.find(query)
            .skip(parseInt(searchParams.page) ? ((searchParams.page - 1) * searchParams.limit) : 0 )
            .limit(parseInt(searchParams.limit) ? searchParams.limit : 10)
        }
    }
    
    
    res.send({
        error: false,
        message: "Retrive all contact successfully",
        count: myContacts.length,
        data: myContacts,
    });
})
//Get contact on the bases of contact ID
router.get('/:id', [auth, admin], async (req, res) => {
    const query = {_id: req.params.id}
    if(!req.contact.isAdmin){
        query.userId= req.contact._id
    }
   
    let myContacts = await Contact.find(query).populate('userId');
    
    res.send({
        error: false,
        message: "Retrive all contact successfully",
        count: myContacts.length,
        data: myContacts,
    });
})

// Create new contact
router.post('/', auth, async (req, res) => {

        const {error} = Validate(req.body);
        if(error){
            return res.status(400).send({
                error: true,
                message: error.details[0].message,
                data: null
            });
        }

        let contact = await new Contact(req.body);
        contact.save();

        res.send({
            error: false,
            message: "Contact added successfully",
            data: req.body
        })
})

// Update new contact
router.put('/:id', auth, async (req, res) => {
    const {error} = Validate(req.body);
    if(error){
        return res.status(400).send({
            error: true,
            message: error.details[0].message,
            data: null
        });
    }

    const myContacts =  await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
    myContacts.save();

    res.send({
        error: false,
        message: "Contact updated successfully",
        data: req.body
    })
})

//Delete contact
router.delete('/:id', auth, async (req, res) => {
    const myContacts =  await Contact.deleteOne({_id:req.params.id});
    if(myContacts?.deletedCount == 0) return res.status(404).send({
        error: true,
        message: 'Contact not exist',
        data: myContacts
    });

    res.send({
        error: false,
        message: "Contact deleted successfully",
        data: myContacts
    })
})

module.exports = router;
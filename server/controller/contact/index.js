const { default: mongoose } = require("mongoose");
const { Contact } = require("../../models/contact");
const { Success, Failuer } = require("../../utils/responseHandler");

const getAllcontacts = async (req, res) => {
    try{
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
        Success(res, false, 'Retrive all contact successfully', myContacts);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}
const getIdBaseContact = async (req, res) => {
    try{
        const query = {_id: req.params.id}
        if(!req.contact.isAdmin){
            query.userId= req.contact._id
        }
    
        let myContacts = await Contact.find(query).populate('userId');

        Success(res, false, 'Retrive all contact successfully', myContacts);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}
const createNewContact = async (req, res) => {
    try{
        let contact = await new Contact(req.body);
        contact.save();
        Success(res, false, 'Contact added successfully', req.body);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

const updateContact = async (req, res) => {
    try{
        const myContacts =  await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
        myContacts.save();
        Success(res, false, 'Contact updated successfully', req.body);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

const deleteContact = async (req, res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return Failuer(res, true, 400, "Invalid ID format", [])
        }
        
        const myContacts =  await Contact.deleteOne({_id:req.params.id});
        if(myContacts?.deletedCount == 0) return Failuer(res, true, 404, "Contact not exist", [])

        Success(res, false, 'Contact deleted successfully', myContacts);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

exports.getAllcontacts = getAllcontacts;
exports.getIdBaseContact = getIdBaseContact;
exports.createNewContact = createNewContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
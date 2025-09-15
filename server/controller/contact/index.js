const { default: mongoose } = require("mongoose");
const { Contact } = require("../../models/contact");
const { Success, Failuer } = require("../../utils/responseHandler");
const { searchContact, findContactById, updateContactById, deleteContactById, updateFavContact, searchAllFavouriteContact } = require("../../services/contact");

const getAllcontacts = async (req, res) => {
    try{
        const myContacts = await searchContact(req);
        Success(res, false, 'Retrive all contact successfully', myContacts);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}
const getIdBaseContact = async (req, res) => {
    try{
        let myContacts = await findContactById(req);
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
        const myContacts =  await updateContactById(req);
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
        
        const myContacts =  await deleteContactById(req);
        if(myContacts?.deletedCount == 0) return Failuer(res, true, 404, "Contact not exist", [])
        Success(res, false, 'Contact deleted successfully', myContacts);
    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

const addToFavorite = async (req, res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return Failuer(res, true, 400, "Invalid ID format", [])
        }
        const myContacts = await updateFavContact(req)
        myContacts.save();
        Success(res, false, 'Contact favorite status updated successfully', myContacts);

    }
    catch(error){
        Failuer(res, true, 400, error.message, [])
    }
}

const getAllFavouriteContacts = async (req, res) => {
    try{
        const myContacts = await searchAllFavouriteContact(req);
        Success(res, false, 'Retrive all contact successfully', myContacts);
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
exports.addToFavorite = addToFavorite;
exports.getAllFavouriteContacts = getAllFavouriteContacts;
const { Contact } = require("../../models/contact");

const searchContact = async(req) => {
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
        return myContacts;
}

const findContactById = async(req) => {
    const query = {_id: req.params.id}
        if(!req.contact.isAdmin){
            query.userId= req.contact._id
        }
    
        return Contact.find(query).populate('userId');
}

const updateContactById = async(req) => {
    return Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
}

const deleteContactById = async(req) => {
    return Contact.deleteOne({_id:req.params.id});
}

exports.searchContact = searchContact;
exports.findContactById = findContactById;
exports.updateContactById = updateContactById;
exports.deleteContactById = deleteContactById;
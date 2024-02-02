const asyncHandler = require('express-async-handler');

const Contact = require("../models/contactModel");

// Get all contacts
//Get api/contacts
//access is public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    if(!contacts){
        res.status(404).json(contacts);;
        throw new Error("List is empty");
    }
    console.log(contacts);
    res.status(200).json(contacts);
});
//Get a contact
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//Create Contact
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const {name, email, phone} = req.body;
    if(!name === "" || !email || !phone){
        res.status(400);
        throw new Error('All fields are mandatory!')
    }
    const contact = await Contact.create({
        name, email, phone
    });
    res.status(201).json(contact);
 
});

//Update contact
//PUT
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);

});

//Delete contact
//Delete
const deleteContact = asyncHandler(async (req, res) => {
    
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
   // await Contact.findOneAndDelete(contact._id);
   await Contact.Remove();
    res.status(200).json(contact);

});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact};
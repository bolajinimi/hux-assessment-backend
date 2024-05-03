const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

// // Sample contact data (replace with database interactions)
// let contacts = [];

// Create a new contact
const createContactHandler = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
  const userId=req.user.userId;
    // Validate request body
    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = await Contact.create({ firstName, lastName, phoneNumber,userId });
    res.status(201).json(newContact);
};   

// Retrieve all contacts
const getAllContactsHandler = async (req, res) => {
    try {
        // Retrieve all contacts from the database
        const contacts = await Contact.find({userId:req.user.userId});
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Retrieve a single contact by ID
const getContactByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        // Find contact by ID in the database
        const contact = await Contact.findById({ _id: id, userId });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a contact by ID
const updateContactHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phoneNumber } = req.body;
        const userId = req.user.userId;
        // Validate request body
        if (!firstName || !lastName || !phoneNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const contact = await Contact.findById({ _id: id, userId });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        // Update contact in the database
        const updatedContact = await Contact.findByIdAndUpdate(id, { firstName, lastName, phoneNumber }, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(updatedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Delete a contact by ID
const deleteContactHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const contact = await Contact.findById({ _id: id, userId });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        // Delete contact from the database
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Export Router
module.exports = {
    createContactHandler, 
    getAllContactsHandler, 
    getContactByIdHandler, 
    updateContactHandler, 
    deleteContactHandler
};

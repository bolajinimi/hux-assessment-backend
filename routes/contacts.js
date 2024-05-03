// contacts.js

const express = require('express');
const { createContactHandler, getAllContactsHandler, getContactByIdHandler, updateContactHandler, deleteContactHandler } = require('../controllers/contactController');
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

// Define route handlers here

// Create a new contact
router.post('/',authenticateToken, createContactHandler);

// Retrieve all contacts
router.get('/',authenticateToken, getAllContactsHandler);

// Retrieve a single contact by ID
router.get('/:id',authenticateToken, getContactByIdHandler);

// Update a contact by ID
router.put('/:id',authenticateToken, updateContactHandler);

// Delete a contact by ID
router.delete('/:id',authenticateToken, deleteContactHandler);

// Export Router
module.exports = router;

// users.js

const express = require('express');
const { createUserHandler, loginHandler, logoutHandler } = require('../controllers/userController');

const router = express.Router();

// Define route handlers here

// Create a new user
router.post('/',createUserHandler);

// User login
router.post('/login',loginHandler);

// User logout
router.post('/logout',logoutHandler);

// Export Router
module.exports = router;

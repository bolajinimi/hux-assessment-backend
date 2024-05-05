

const express = require('express');
const { createUserHandler, loginHandler, logoutHandler } = require('../controllers/userController');

const router = express.Router();


router.post('/',createUserHandler);


router.post('/login',loginHandler);

router.post('/logout',logoutHandler);

// Export Router
module.exports = router;

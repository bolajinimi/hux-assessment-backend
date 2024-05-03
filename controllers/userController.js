const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user
const createUserHandler = async (req, res) => {
    try {
        const { username, password,confirmPassword } = req.body;
        
        // Validate request body
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (password!== confirmPassword) {
            return res.status(400).json({ message: 'Password and Confirm password does not match' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user using the User model
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// User login
const loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// User logout
const logoutHandler = (req, res) => {
    // Implementation of logout logic
    res.json({ message: 'Logout successful' });
};

module.exports = {
    createUserHandler,
    loginHandler,
    logoutHandler,
};
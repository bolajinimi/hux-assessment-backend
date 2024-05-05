const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUserHandler = async (req, res) => {
    try {
        const { username, password,confirmPassword } = req.body;
        
        
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (password!== confirmPassword) {
            return res.status(400).json({ message: 'Password and Confirm password does not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = await User.create({ username, password: hashedPassword });
        delete newUser.password
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

       
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

     
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const logoutHandler = (req, res) => {
    
    res.json({ message: 'Logout successful' });
};

module.exports = {
    createUserHandler,
    loginHandler,
    logoutHandler,
};
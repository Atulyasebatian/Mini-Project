const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// @route   POST api/auth/signup
// @desc    Register a user (role is automatically 'Passenger')
// @access  Public
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // NOTE: This public endpoint correctly and securely defaults to 'Passenger'.
    // Privileged roles like 'Operator' or 'Admin' should be created
    // via a separate, secure admin panel or directly in the database for security.
    user = new User({
      fullName,
      email,
      password,
      role: 'Passenger',
    });
    
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate any valid user & get token
// @access  Public
// NOTE: No changes are needed here. This route is generic and will issue a token
// containing the user's role, regardless of what that role is. The frontend
// is responsible for handling redirection.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = (password === user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        const payload = {
            user: {
                id: user.id,
                role: user.role
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
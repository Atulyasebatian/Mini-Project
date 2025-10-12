import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// @route   POST api/auth/signup
// @desc    Register a user
// @access  Public
router.post('/signup', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      fullName,
      email,
      password,
      role, // Role is taken from request body
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
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = (password === user.password); // Plain text password check
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        
        // --- THE CHANGE IS HERE ---
        // Add the user's full name to the token payload
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                fullName: user.fullName // ADD THIS LINE
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'jwtSecret', // Fallback secret
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

export default router;
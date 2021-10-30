const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Iamaprogrammer$21';

// ROUTE 1 : Create a User using: POST "/api/auth/". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password mst be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // Check whether this user email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: 'Sorry a user with this email already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)

        success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error');
    }
})


// ROUTE 2 : Authenticate a User using: POST "/api/auth/login". 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false
    // If there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: 'Please try to login with correct crendentials' });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: 'Please try to login with correct crendentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// Route 3 : Get loggedin User Details using : POST "api/auth/getuser". Login required
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Sever Error');
    }
})
module.exports = router
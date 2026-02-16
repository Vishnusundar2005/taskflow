const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// REGISTER
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

       const {password:_, ...userWithoutPassword} = user._doc;

        res.status(201).json({
            token,
            user:userWithoutPassword
        });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// LOGIN
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const {password:_, ...userWithoutPassword} = user._doc;

        res.json({
        token,
        user:userWithoutPassword
        });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

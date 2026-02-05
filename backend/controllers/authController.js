const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json("User already exists");

        const hash = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hash, role: role || 'user' });
        res.json("Registered");
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json("Invalid credentials");

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

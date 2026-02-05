const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.approveVehicle = async (req, res) => {
    try {
        await Vehicle.findByIdAndUpdate(req.params.id, { approved: true });
        res.json("Approved");
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getPendingVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ approved: false }).populate('ownerId', 'name email');
        res.json(vehicles);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create({
            ...req.body,
            ownerId: req.user.id
        });
        res.json(vehicle);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getMyVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ ownerId: req.user.id });
        res.json(vehicles);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('ownerId', 'name email');
        res.json(vehicles);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

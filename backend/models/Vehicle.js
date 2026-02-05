const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    carName: { type: String, required: true },
    model: { type: String },
    fuelType: { type: String },
    registrationNumber: { type: String, required: true, unique: true },
    approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);

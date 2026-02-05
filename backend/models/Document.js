const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    type: { type: String, enum: ["RC", "INSURANCE", "PUC"], required: true },
    fileUrl: { type: String, required: true },
    expiryDate: Date
});

module.exports = mongoose.model('Document', DocumentSchema);

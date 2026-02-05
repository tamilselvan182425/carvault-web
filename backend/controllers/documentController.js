const Document = require('../models/Document');
const cloudinary = require('../config/cloudinary');

exports.uploadDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json("No file uploaded");

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const { vehicleId, type, expiryDate } = req.body;

        // Create Document
        const document = await Document.create({
            vehicleId,
            type,
            fileUrl: result.secure_url,
            expiryDate
        });

        res.json(document);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ vehicleId: req.params.vehicleId });
        res.json(documents);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

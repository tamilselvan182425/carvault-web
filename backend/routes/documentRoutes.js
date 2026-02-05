const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temp storage

router.post('/upload', authMiddleware, upload.single('file'), documentController.uploadDocument);
router.get('/:vehicleId', authMiddleware, documentController.getDocuments);

module.exports = router;

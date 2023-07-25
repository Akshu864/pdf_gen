const express = require('express');
const router = express.Router();
const pdfController = require('../controller/pdfController');

// API endpoint to generate a PDF from text input
router.post('/generate-pdf', pdfController.generatePDF);

module.exports = router;

const PDFDocument = require('pdfkit');
const fs = require('fs');
const PDF = require('../models/pdfModel');

const generatePDF = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text input is missing.' });
  }

  try {
    // Calling the model to save the PDF content
    const pdf = new PDF({ content: text });
    const savedPDF = await pdf.save();

    // Calling the view (PDFKit) to generate the PDF and save it to a file
    const filePath = await renderPDF(savedPDF);

    return res.json({ message: 'PDF generated successfully.', filePath });
  } catch (error) {
    return res.status(500).json({ error: 'PDF generation failed.' });
  }
};

const renderPDF = async (pdfContent) => {
  // Using PDFKit to generate the PDF
  const doc = new PDFDocument();
  doc.fontSize(12).text(pdfContent.content, 100, 100);

  // Saving the PDF to a file
  const filePath = 'output.pdf';
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);
  doc.end();

  //It will return a Promise that resolves when the PDF is fully generated
  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', (error) => reject(error));
  });
};

module.exports = {
  generatePDF,
};

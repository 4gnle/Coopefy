const multer = require('multer');
const {v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
}

const fileFilter = (req, file, cb) => {
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  let error = isValid ? null : new Error('Invalid File');
  cb(error, isValid);
}

// TESTING THE UPLOAD COMPONENT
const imageUpload = multer({
  limits: 500000,
  fileFilter: fileFilter
});

module.exports = imageUpload;

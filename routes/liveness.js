const express = require('express');
const router = express.Router();
const multer = require('multer');

const livenessController = require('../controllers/liveness');

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype ===  'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

router.get('/', livenessController.index);

router.get('/webcam', livenessController.webcam);

router.post('/upload', upload.single('idCardImg') , livenessController.detectIdCard);

router.post('/webcam', upload.single('webcam'), livenessController.detectWebcam);

module.exports = router;

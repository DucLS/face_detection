const express = require('express');
const router = express.Router();
const multer = require('multer');

const photoController = require('../controllers/photo');

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

router.get('/', photoController.index)

router.get('/personal', photoController.personal)

router.post('/upload', upload.single('idCardImg') , photoController.detectIdCard)

router.post('/personal-images', upload.single('personalImg'), photoController.detectPersonalImage)

module.exports = router;

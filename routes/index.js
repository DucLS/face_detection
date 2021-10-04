const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/result', (req, res) => {
    const imgIDCard = req.cookies.imgIDCard;
    const imgPersonal = req.cookies.imgPersonal;
    const result = req.cookies.result;

    res.render('result', {
        imgIDCard,
        imgPersonal,
        result,
    })
})

module.exports = router;

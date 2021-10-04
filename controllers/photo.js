const FaceAPIService = require('../services/faceApiService');
let resultIdCard;
let resultPersonalImg;

let imgIDCard;
let imgPersonal;

module.exports = {
    index: function (req, res) {
        return res.render('photo');
    },

    personal: function (req, res) {
        return res.render('personal');
    },

    detectIdCard: async function (req, res) {
        const result = await FaceAPIService.detectImg(req, res);

        this.imgIDCard = req.file.path;

        this.resultIdCard = result;

        return res.redirect('personal');
    },

    detectPersonalImage: async function (req, res) {
        const result = await FaceAPIService.detectImg(req, res);

        this.imgPersonal = req.file.path;

        this.resultPersonalImg = result;

        const finalResult = await FaceAPIService.compare(this.resultIdCard, this.resultPersonalImg);

        res.cookie('imgIDCard', this.imgIDCard.split('/').pop());
        res.cookie('imgPersonal', this.imgPersonal.split('/').pop());
        res.cookie('result', finalResult);

        return res.redirect('/result');
    },
};

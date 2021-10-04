const FaceAPIService = require('../services/faceApiService');

let resultCardId;
let resultWebcam;

let imgIDCard;
let imgWebcam;

function compare(resultIdCard, resultPersonalImg) {
    FaceAPIService.compare(resultIdCard, resultPersonalImg);
}

module.exports = {
    index: function (req, res) {
        return res.render('photo-liveness');
    },

    webcam: function (req, res) {
        return res.render('webcam-liveness');
    },

    detectIdCard: async function (req, res) {
        const result = await FaceAPIService.detectImg(req, res);

        this.resultIdCard = result;

        this.imgIDCard = req.file.path;

        return res.redirect('webcam');
    },

    detectWebcam: async function (req, res) {
        const result = await FaceAPIService.detectImg(req, res);

        this.resultWebcam = result;

        this.imgWebcam =req.file.path;

        const finalResult = await FaceAPIService.compare(this.resultIdCard, this.resultWebcam);

        res.cookie('imgIDCard', this.imgIDCard.split('/').pop());
        res.cookie('imgPersonal', this.imgWebcam.split('/').pop());
        res.cookie('result', finalResult);

        res.end(JSON.stringify({ status: 200 }));
    }
}

const fs = require('fs');
const path = require('path');

const faceAPI = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas
faceAPI.env.monkeyPatch({ Canvas, Image, ImageData })

module.exports = {
    detectImg: async function (req, res) {
        await faceAPI.nets.faceRecognitionNet.loadFromDisk(path.join(process.cwd(), 'models'));
        await faceAPI.nets.faceLandmark68Net.loadFromDisk(path.join(process.cwd(), 'models'));
        await faceAPI.nets.ssdMobilenetv1.loadFromDisk(path.join(process.cwd(), 'models'));

        const referenceImage = await canvas.loadImage(req.file.path);
        const result = await faceAPI.detectSingleFace(referenceImage).withFaceLandmarks().withFaceDescriptor();

        return result;
    },

    compare: async function (resultIdCard, resultPersonalImg) {
        const faceMatcher = new faceAPI.FaceMatcher(resultIdCard, 0.5);
        const bestMatch = faceMatcher.findBestMatch(resultPersonalImg.descriptor);

        if (bestMatch.distance <= 0.5) {
            return true
        }

        return false
    }
}

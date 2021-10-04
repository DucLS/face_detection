const idCardImg = document.getElementById('idCardImg');
const personImg = document.getElementById('personImg');

const uploadIdCardImg = document.getElementById('upload-id-card-img');
const uploadPersonImg = document.getElementById('upload-person-img');


Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
]).then(start);

function start() {
    let idCard;
    let person;

    idCardImg.addEventListener('change', async () => {
        const container = document.createElement('div');
        container.style.position = 'relative';
        uploadIdCardImg.append(container);

        const img = await faceapi.bufferToImage(idCardImg.files[0]);
        container.append(img);

        const canvas = faceapi.createCanvasFromMedia(img);
        container.append(canvas);

        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

        const resizedDetection = faceapi.resizeResults(detection, displaySize);

        const box = detection.detection.box;

        const drawBox = new faceapi.draw.DrawBox(box);

        idCard = detection;
        
        console.log(idCard);
    });

    personImg.addEventListener('change', async () => {
        const container = document.createElement('div');
        container.style.position = 'relative';
        uploadPersonImg.append(container);

        const img = await faceapi.bufferToImage(personImg.files[0]);
        container.append(img);

        const canvas = faceapi.createCanvasFromMedia(img);
        container.append(canvas);

        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

        const resizedDetection = faceapi.resizeResults(detection, displaySize);

        const box = detection.detection.box;

        const drawBox = new faceapi.draw.DrawBox(box);

        person = detection;

        const faceMatcher = new faceapi.FaceMatcher(person);

        const bestMatch = faceMatcher.findBestMatch(idCard.descriptor)
        console.log(bestMatch.toString())
    });
}

const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('take-photo');
const canvas = document.getElementById('canvas');

function startVideo() {
    navigator.getUserMedia({ video: {} }, stream => video.srcObject = stream, err => console.log(err));
}

startVideo();

takePhotoBtn.addEventListener('click', function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    let blob = canvas.toBlob(function(blob) {
        let formData = new FormData();
        file = new File([blob], 'webcam.jpg', { type: 'image/jpeg' });
        formData.append('webcam', file);

        $.ajax({
            url: 'http://localhost:5000/liveness/webcam',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data){
                window.location.replace('/result')
            }
        });
    }, 'image/jpeg');
});

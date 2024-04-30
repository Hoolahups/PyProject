function updateImage() {
    var folder = document.getElementById('folder').value;
    var type = document.getElementById('type').value;
    var year = document.getElementById('year').value;
    var month = document.getElementById('month').value;

    var imagePath = 'graphs/' + folder + '/' + type + year + '-' + month + '.png';

    var img = new Image();
    img.src = imagePath;
    img.onload = function() {
        document.getElementById('imageDisplay').style.display = 'block';
        document.getElementById('imageDisplay').src = imagePath;
        document.getElementById('errorMessage').textContent = '';
    };
    img.onerror = function() {
        document.getElementById('imageDisplay').style.display = 'none';
        document.getElementById('errorMessage').textContent = 'This month\'s data does not exist.';
    };
}
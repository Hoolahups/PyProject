function updateImage() {
    var folder = document.getElementById('folder').value;
    var type = document.getElementById('type').value;
    
    if (type === 'gif') {
        // Load the GIF for the selected folder
        var imagePath = 'gifs/' + folder + '.gif';
        displayImage(imagePath);
    } else {
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        var imagePath = 'graphs/' + folder + '/' + type + year + '-' + month + '.png';
        displayImage(imagePath);
    }
}

function displayImage(imagePath) {
    var img = new Image();
    img.src = imagePath;
    img.onload = function() {
        document.getElementById('imageDisplay').style.display = 'block';
        document.getElementById('imageDisplay').src = imagePath;
        document.getElementById('errorMessage').textContent = '';
    };
    img.onerror = function() {
        document.getElementById('imageDisplay').style.display = 'none';
        document.getElementById('errorMessage').textContent = 'This month\'s data does not exist or invalid selection.';
    };
}

function updateSelectors() {
    var type = document.getElementById('type').value;
    var yearSelector = document.getElementById('year');
    var monthSelector = document.getElementById('month');
    
    if (type === 'gif') {
        yearSelector.style.display = 'none';
        monthSelector.style.display = 'none';
    } else {
        yearSelector.style.display = 'block';
        monthSelector.style.display = 'block';
    }
}
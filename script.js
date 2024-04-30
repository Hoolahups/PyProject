document.addEventListener('DOMContentLoaded', function() {
    updateSelectors(); // Call on initial load
    updateImage(); // Call to set initial image or GIF
});

function updateImage() {
    var folder = document.getElementById('folder').value;
    var type = document.getElementById('type').value;

    if (type === 'gif') {
        var imagePath = 'gifs/' + folder + '.gif';
    } else {
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        var imagePath = 'graphs/' + folder + '/' + type + year + '-' + month + '.png';
    }

    displayImage(imagePath);
}

function updateSelectors() {
    var type = document.getElementById('type').value;
    var yearSelector = document.getElementById('year').parentNode; // Get parent element for label and select
    var monthSelector = document.getElementById('month').parentNode; // Get parent element for label and select
    
    if (type === 'gif') {
        yearSelector.style.display = 'none';
        monthSelector.style.display = 'none';
    } else {
        yearSelector.style.display = 'block';
        monthSelector.style.display = 'block';
    }
}

function displayImage(imagePath) {
    var img = document.getElementById('imageDisplay');
    img.onload = function() {
        img.style.display = 'block';
        document.getElementById('errorMessage').textContent = '';
    };
    img.onerror = function() {
        img.style.display = 'none';
        document.getElementById('errorMessage').textContent = 'This image or GIF does not exist.';
    };
    img.src = imagePath; // This actually triggers the loading
}

// Update selectors when the 'type' changes
document.getElementById('type').addEventListener('change', function() {
    updateSelectors();
    updateImage();
});

// Similarly, call updateImage when other selectors change
document.getElementById('folder').addEventListener('change', updateImage);
document.getElementById('year').addEventListener('change', updateImage);
document.getElementById('month').addEventListener('change', updateImage);

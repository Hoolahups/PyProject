document.addEventListener('DOMContentLoaded', function() {
    updateSelectors(); // Call on initial load to set up the correct UI elements
    updateImage(); // Set initial image or GIF based on default selections
});

function updateSelectors() {
    var type = document.getElementById('type').value;
    var dateSelectors = document.getElementById('dateSelectors'); // New container for date selectors
    var lineNameContainer = document.getElementById('lineNameContainer');

    dateSelectors.style.display = 'none'; // Hide date selectors by default
    lineNameContainer.style.display = 'none'; // Hide line name input by default

    if (type === 'gif') {
        // GIF type does not require any additional selectors
    } else if (type === 'line') {
        // Line type requires name input for autocomplete
        lineNameContainer.style.display = 'block';
    } else {
        // Change and Percentage types require date selectors
        dateSelectors.style.display = 'block';
    }
}

function loadLineNames() {
    var folder = document.getElementById('folder').value;
    var namesPath = 'graphs/' + folder + '_name.txt';
    fetch(namesPath)
        .then(response => response.text())
        .then(text => {
            var names = text.split('\n');
            var dataList = document.getElementById('nameOptions');
            dataList.innerHTML = ''; // Clear previous options
            names.forEach(function(name) {
                if (name) { // Ensure non-empty names are added
                    var option = document.createElement('option');
                    option.value = name;
                    dataList.appendChild(option);
                }
            });
        }).catch(error => {
            console.error('Error loading the name list:', error);
        });
}


if (type === 'line') {
    console.log("Loading line names...");
    lineNameContainer.style.display = 'block';
    loadLineNames(); // Load names for autocomplete when 'Line' type is selected
}


function updateImage() {
    var folder = document.getElementById('folder').value;
    var type = document.getElementById('type').value;

    if (type === 'gif') {
        var imagePath = 'gifs/' + folder + '.gif';
    } else if (type === 'line') {
        var name = document.getElementById('lineNameInput').value;
        var imagePath = 'graphs/' + folder + '/line_' + name.replace(/ /g, '_').replace(/\//g, '-') + '.png';
    } else {
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        var imagePath = 'graphs/' + folder + '/' + type + year + '-' + month + '.png';
    }

    displayImage(imagePath);
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

document.getElementById('type').addEventListener('change', function() {
    updateSelectors();
    updateImage();
});
document.getElementById('folder').addEventListener('change', function() {
    updateSelectors(); // Update UI elements based on new folder selection
    updateImage();
});
document.getElementById('year').addEventListener('change', updateImage);
document.getElementById('month').addEventListener('change', updateImage);

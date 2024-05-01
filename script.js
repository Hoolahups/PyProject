document.addEventListener('DOMContentLoaded', function() {
    updateSelectors(); // Call on initial load to set up the correct UI elements
    updateImage(); // Set initial image or GIF based on default selections
});

function updateSelectors() {
    var type = document.getElementById('type').value;
    var yearSelector = document.getElementById('year').parentNode;
    var monthSelector = document.getElementById('month').parentNode;
    var lineNameContainer = document.getElementById('lineNameContainer');

    if (type === 'gif') {
        yearSelector.style.display = 'none';
        monthSelector.style.display = 'none';
        lineNameContainer.style.display = 'none';
    } else if (type === 'line') {
        yearSelector.style.display = 'none';
        monthSelector.style.display = 'none';
        lineNameContainer.style.display = 'block';
        loadLineNames();  // Function to load names into the datalist
    } else {
        yearSelector.style.display = 'block';
        monthSelector.style.display = 'block';
        lineNameContainer.style.display = 'none';
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
            dataList.innerHTML = '';
            names.forEach(name => {
                var option = document.createElement('option');
                option.value = name;
                dataList.appendChild(option);
            });
        });
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

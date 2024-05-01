var names = []; // Global array to store names for autocomplete

document.addEventListener('DOMContentLoaded', function() {
    updateSelectors(); // Set up UI elements correctly based on initial type
    updateImage(); // Load initial image based on default settings
});

function updateSelectors() {
    var type = document.getElementById('type').value;
    var dateSelectors = document.getElementById('dateSelectors'); // Container for date selectors
    var lineNameContainer = document.getElementById('lineNameContainer'); // Container for line name input

    // Initially hide date selectors and line name input
    dateSelectors.style.display = 'none';
    lineNameContainer.style.display = 'none';

    // Display appropriate UI elements based on the type selected
    if (type === 'gif') {
        // No additional selectors needed for GIFs
    } else if (type === 'line') {
        // Show line name input for autocomplete
        lineNameContainer.style.display = 'block';
        loadLineNames(); // Load names whenever 'line' type is selected
    } else {
        // Show date selectors for 'change' and 'percentage' types
        dateSelectors.style.display = 'block';
    }
}

function loadLineNames() {
    var folder = document.getElementById('folder').value;
    var namesPath = 'graphs/' + folder + '_name.txt';
    fetch(namesPath)
        .then(response => response.text())
        .then(text => {
            names = text.split('\n').map(name => name.trim()).filter(Boolean);
            updateDatalist(names);
        }).catch(error => {
            console.error('Failed to load names:', error);
        });
}

function updateDatalist(names) {
    var dataList = document.getElementById('nameOptions');
    dataList.innerHTML = ''; // Clear previous options
    names.forEach(name => {
        var option = document.createElement('option');
        option.value = name;
        dataList.appendChild(option);
    });
}

document.getElementById('lineNameInput').addEventListener('input', function() {
    var inputVal = this.value.toLowerCase();
    var filteredNames = names.filter(name => name.toLowerCase().includes(inputVal));
    updateDatalist(filteredNames);
});

function updateImage() {
    var folder = document.getElementById('folder').value;
    var type = document.getElementById('type').value;

    var imagePath;
    if (type === 'gif') {
        imagePath = 'gifs/' + folder + '.gif';
    } else if (type === 'line') {
        var name = document.getElementById('lineNameInput').value;
        imagePath = 'graphs/' + folder + '/line_' + name.replace(/ /g, '_').replace(/\//g, '-') + '.png';
    } else {
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        imagePath = 'graphs/' + folder + '/' + type + year + '-' + month + '.png';
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
    img.src = imagePath;
}

// Add event listeners to other elements
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

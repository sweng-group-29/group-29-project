
// Load sidebar into each page
window.onload = function () {
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    
    // Select theme
    /*
    var modeSelector = document.getElementById('mode-selector');
    // Apply the saved theme
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.className = savedTheme;
      modeSelector.value = savedTheme;
    }
    // Save the selected theme and apply it
    modeSelector.addEventListener('change', function() {
      document.body.className = this.value;
      localStorage.setItem('theme', this.value);
    });
    */
}

// Global variable to store the selected file
var selectedFile = null;

// Show ratings when report is summarized
document.getElementById('textForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Check if a file has been selected
    var fileInput = document.getElementById('txtFile');
    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    // If a file is selected, show the rating form
    document.getElementById('userRating').style.display = 'block';

    // If a file is uploaded, use it; otherwise, use the selected file
    var fileToUse = fileInput.files.length > 0 ? fileInput.files[0] : selectedFile;

    // Now you can use fileToUse to do whatever you need with the file
});


document.getElementById('openWindowButton').addEventListener('click', function() {
    window.open('files.html', '_blank', 'width=600,height=600');
  });

  // Hide choose file button and show file name
document.getElementById('customFileUpload').addEventListener('click', function() {
    document.getElementById('txtFile').click();
});

document.getElementById('txtFile').addEventListener('change', function() {
    var fileName = this.value.split('\\').pop();
    document.getElementById('fileName').textContent = 'File Chosen: ' + fileName;
});


document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('fileList');
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change',
        handleFileSelect);

    const dragDropContainer = document.querySelector('.drag-drop-container');

    dragDropContainer.addEventListener('drop', handleDrop);

    dragDropContainer.addEventListener('dragover', handleDragover);
});

function handleFileSelect(event) {
    const fileList = document.getElementById('fileList');
    const files = event.target.files || event.dataTransfer.files;

    for (const file of files) {
        const listItem = document.createElement('div');
        listItem.className = 'file-item';

        const fileImage = document.createElement('img');
        fileImage.className = 'file-image';
        fileImage.src = 'file.png';
        fileImage.alt = 'File Icon';

        const fileName = document.createElement('span');
        fileName.textContent = file.name;

        const deleteButton = document.createElement('span');
        deleteButton.className= 'delete-button';
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        })

        fileList.appendChild(listItem);
        listItem.appendChild(fileImage);
        listItem.appendChild(fileName);
        listItem.appendChild(deleteButton);

    }
}


function handleDrop(event) {
    event.preventDefault();
    handleFileSelect(event);
}
function handleDragOver(event) {
    event.preventDefault();
}

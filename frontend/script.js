
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
}

// Show ratings when report is summarized

document.getElementById('textForm').addEventListener('submit', function (event) {
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
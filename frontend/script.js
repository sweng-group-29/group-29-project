
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('dropDown').addEventListener('click', function() {
    document.querySelector('.drop-down').classList.toggle('drop-down--active');
  });
});


// --------------------------------- //
// Sidebar
// --------------------------------- //

// Load sidebar into each page
window.onload = function () {
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;

            // Add the event listener after the sidebar is loaded
            document.getElementById('nav-toggle').addEventListener('change', function() {
                if(this.checked) {
                    document.body.classList.remove('sidebar-open');
                } else {
                    document.body.classList.add('sidebar-open');
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// --------------------------------- //
// LLM-Screen
// --------------------------------- //

// Global variable to store the selected file
var selectedFile = null;

// Show ratings when report is summarized
function showSummary() {
    var summaryDiv = document.getElementById("summary");
    var summarizedText = document.getElementById("summarizedText");
    var userRatingForm = document.getElementById("userRating");

    // Show the summary and user rating form
    summaryDiv.style.display = "block";
    userRatingForm.style.display = "block";

    // Update the summarized text
    summarizedText.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}


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

// --------------------------------- //
// File Manager
// --------------------------------- //

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


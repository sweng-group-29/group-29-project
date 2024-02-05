
// Load sidebar into each page
window.onload = function() {
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
});
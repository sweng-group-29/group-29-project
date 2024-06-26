
// --------------------------------- //
// Sidebar
// --------------------------------- //

window.onload = function () {
    // Load sidebar into each page
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

    // --------------------------------- //
    // Login Page
    // --------------------------------- //
        
    const switchers = [...document.querySelectorAll('.switcher')]
        
    switchers.forEach(item => {
    	item.addEventListener('click', function() {
    		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
    		this.parentElement.classList.add('is-active')
    	})
    })

    // Get the form and email input elements
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');

    // Add an event listener for the form submission
    form.addEventListener('submit', function(event) {
        // Prevent the form from being submitted normally
        event.preventDefault();

        // Get the email from the input field
        const email = emailInput.value;

        // Check if the email is valid
        if (validateEmail(email)) {
            // If the email is valid, redirect to the LLM page
            window.location.href = 'llm.html';
        } else {
            // If the email is not valid, show an error message
            alert('Please enter a valid email address.');
        }
    });

    // Function to validate an email address
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }  
    
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
    summarizedText.style.visibility = "visible";
    summarizedText.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}


document.getElementById('openWindowButton').addEventListener('click', function() {
    window.open('fileManager.html', '_blank', 'width=600,height=600');
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
    const fileInput = document.getElementById('txtFile');
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
        fileImage.src = 'assets/images/paper.svg';
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

// --------------------------------- //
// Summmary
// --------------------------------- //

function sum() { 
    const fileInput = document.getElementById('txtFile');
    const languageModelSelect = document.getElementById('languageModel'); // Get the select element
    const selectedModelValue = languageModelSelect.value; // Get the selected value

    const file = fileInput.files[0]; // Assuming there's at least one file selected

    if (!file) {
        alert('Please select a file first!');
        return;
    }

    // Determine which model to use based on the selected option
    let modelEndpoint;
    if (selectedModelValue === 'BART') {
        modelEndpoint = 'facebook/bart-large-xsum';
    } else if (selectedModelValue === 'gpt3') {
        modelEndpoint = 'gpt-3.5-turbo-1106';
    } else if (selectedModelValue === 'googlepeg') {
        modelEndpoint = 'google/pegasus-large';
    } else if (selectedModelValue === 'gpt4') {
        modelEndpoint = 'gpt-4-0125-preview';
    } else {
        alert('Invalid model selected!');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const fileContents = e.target.result;

        try {
            callFlaskEndpoint(modelEndpoint, fileContents);
        } catch (error) {
            alert('Error parsing JSON: ' + error.message);
        }
    };

    reader.onerror = function() {
        alert('Error reading file!');
    };

    // Read the file as text
    reader.readAsText(file);
}


async function callFlaskEndpoint(llm, prompt) {
  const url = 'http://127.0.0.1:5000/prompt'
  const data = { llm, prompt };

  try {
    const response = await fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(response)
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json(); 
    console.log(result);
    //alert(JSON.stringify(result, null, 2)); 

      const resultBox = document.getElementById('summary').children[0];
      const outerbox = document.getElementById('summary');
    outerbox.style.visibility = "visible";
    resultBox.innerHTML = result.summary[0].summary_text;

  } catch (error) {
    console.error('Error:', error);
    alert('Error calling the Flask endpoint: ' + error.message);
  }
}

document.getElementById("submitReviewButton").addEventListener("click", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    var rating = document.querySelector('input[name="rating"]:checked');
    var comment = document.getElementById("userComment").value;

    // Ensure both rating and comment are provided
    if (!rating || !comment) {
        alert("Please provide both a rating and a comment.");
        return;
    }

    // Mapping for language model values
    var modelMapping = {
        "BART": "BART",
        "gpt3": "GPT-3.5",
        "gpt4": "GPT 4",
        "googlepeg": "Google Pegasus"
        // Add more mappings as needed
    };

    // Prepare data to send to backend
    var reviewData = {
        llm: modelMapping[document.getElementById("languageModel").value],
        rating: rating.value,
        review: comment
    };

    // Send review data to backend
    fetch('http://127.0.0.1:5000/reviews', { // Update the URL here
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.ReviewMessage);
        fetchReviews(llm);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});



// --------------------------------- //
// Stats Screen
// --------------------------------- //


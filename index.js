const form = document.querySelector("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const emailAddress = document.getElementById("email");
const queryType = document.querySelectorAll('input[name="enquiry"]');
const message = document.getElementById("message");
const consent = document.getElementById("consent");
const submitButton = document.getElementById("submit");
const errorMessages = document.querySelectorAll(".error-message")


// Function to show error
function showError(input) {
    const errorMessage = input.closest(".input-wrapper").querySelector(".error-message");
    if(errorMessage) {
        errorMessage.style.display = "block";
    }
}

// Function to hide error
function hideError(input) {
    const errorMessage = input.closest(".input-wrapper").querySelector(".error-message");
    if(errorMessage) {
        errorMessage.style.display = "none";
    }
}


// Function to validate fields.
function validateField(input) {
    if(input.type === "radio") {
        const isChecked = Array.from(queryType).some(radio => radio.checked);
        if(!isChecked){
            showError(queryType[0]);
            return false;
        }
        hideError(queryType[0]);
        return true;
    } else if (input.type === "checkbox") {
        if(!input.checked) {
            showError(input);
            return false;
        }
        hideError(input);
        return true;
    } else {
        if (!input.value.trim()) {
            showError(input);
            return false
        }
        hideError(input)
        return true;
    }
}


// Function to validate the entire form.
function validateForm () {
    let isValid = true;

    isValid &= validateField(firstName);
    isValid &= validateField(lastName);
    isValid &= validateField(emailAddress);
    isValid &= validateField(queryType[0]);
    isValid &= validateField(message);
    isValid &= validateField(consent);


    return !!isValid;
}


// Function to display the success message
function showSuccessMessage () {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-container");

    // Add content to the success message
    successMessage.innerHTML = `
        <div class="success-content">
            <img 
                src="./assets/images/icon-success-check.svg"
                class="success-check"
                alt="success icon"
            />
            <h1 class="success-message">Message Sent!</h1>
        </div>
        <p class="success-paragraph">Thanks for completing the form. We'll be in touch soon!</p>
    `

    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}


// Event listener for submit button
submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    if(validateForm()) {
        showSuccessMessage();

        form.reset();

        errorMessages.forEach(error => {
            error.style.display = "none";
        });
    }
})

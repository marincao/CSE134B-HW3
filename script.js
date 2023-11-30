/**
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');
    const infoOutput = document.querySelector('output.info');
    const formErrors = [];

    form.addEventListener('submit', function (event) {
        // Check validity using Constraint Validation API
        if (!form.checkValidity()) {
            event.preventDefault();
            // Display custom error messages
            displayErrorMessages();
            // Submit form errors to the server-side
            submitFormErrors();
        } else {
            infoOutput.textContent = ''; // Clear previous info messages
        }
    });

    // Display custom error messages
    function displayErrorMessages() {
        validateField(nameInput);
        validateField(emailInput);
        validateField(commentsInput);
    }

    // Validate individual field
    function validateField(field) {
        if (!field.checkValidity()) {
            field.classList.add('flash');
            const errorOutput = document.querySelector(`output[for="${field.id}"]`);
            const errorMessage = field.validationMessage;
            errorOutput.textContent = errorMessage;
            errorOutput.classList.add('error');
            formErrors.push({ field: field.id, message: errorMessage });
            setTimeout(() => {
                field.classList.remove('flash');
                errorOutput.classList.remove('error');
                errorOutput.textContent = '';
            }, 3000);
        }
    }

    // Masking mechanism for disallowed characters
    nameInput.addEventListener('input', function () {
        const maskedValue = nameInput.value.replace(/[^a-zA-Z ]/g, '');
        if (nameInput.value !== maskedValue) {
            nameInput.value = maskedValue;
            flashField(nameInput, 'Illegal characters not allowed.');
        }
    });

    emailInput.addEventListener('input', function () {
        const maskedValue = emailInput.value.replace(/[^a-zA-Z0-9@.]/g, '');
        if (emailInput.value !== maskedValue) {
            emailInput.value = maskedValue;
            flashField(emailInput, 'Illegal characters not allowed.');
        }
    });

    // Character countdown for comments textarea
    commentsInput.addEventListener('input', function () {
        const maxLength = parseInt(commentsInput.getAttribute('maxlength'));
        const remainingChars = maxLength - commentsInput.value.length;

        const infoOutput = document.querySelector('output[for="comments"]');
        if (remainingChars > 10) {
            infoOutput.textContent = `Characters remaining: ${remainingChars}`;
            infoOutput.classList.remove('warning', 'error');
        } else if (remainingChars > 0) {
            infoOutput.textContent = `Warning: ${remainingChars} characters remaining`;
            infoOutput.classList.remove('error');
            infoOutput.classList.add('warning');
        } else {
            infoOutput.textContent = 'Error: Maximum character limit reached';
            infoOutput.classList.remove('warning');
            infoOutput.classList.add('error');
        }
    });

    // Flash animation for invalid input
    function flashField(field, message) {
        field.classList.add('flash');
        const errorOutput = document.querySelector(`output[for="${field.id}"]`);
        errorOutput.textContent = message;
        errorOutput.classList.add('error');
        formErrors.push({ field: field.id, message });
        setTimeout(() => {
            field.classList.remove('flash');
            errorOutput.classList.remove('error');
            errorOutput.textContent = '';
        }, 3000);
    }

    // Submit form errors to the server-side
    function submitFormErrors() {
        const formErrorsInput = document.createElement('input');
        formErrorsInput.type = 'hidden';
        formErrorsInput.name = 'form_errors';
        formErrorsInput.value = JSON.stringify(formErrors);
        form.appendChild(formErrorsInput);
    }
});
**/
const username = document.getElementById("name");
const email = document.getElementById("email");
const comment = document.getElementById("comments");

const form_errors = new Array();


username.addEventListener("submit", (event) => {
    if(!username.checkValidity()){
        username.setCustomValidity("Last name required!");   
        form_errors.push("lname_error");
        event.preventDefault(); 
        event.reportValidity();
    }
    else{
        username.setCustomValidity("");
    }
});

email.addEventListener("submit", (event) => {
    if(!email.checkValidity()){
        email.setCustomValidity("Email address required!");    
        form_errors.push("email_error");
        event.preventDefault();
        event.reportValidity();
    }
    else{
        email.setCustomValidity("");
    }
});

comment.addEventListener("submit", (event) => {
    if(!comment.checkValidity()){
        comment.setCustomValidity("Comment required!");    
        form_errors.push("comment_error");
        event.preventDefault();
        event.reportValidity();
    }
    else{
        comment.setCustomValidity("");
    }
});

const resp = await fetch('https://httpbin.org/post', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(form_errors)
});
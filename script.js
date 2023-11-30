const username = document.getElementById("name");
const email = document.getElementById("email");
const comments = document.getElementById("comments");
const form = document.getElementById('contact-form');
const infoOutput = document.querySelector('output.info');

username.addEventListener("submit", (event) => {
    if(!username.checkValidity()){
        username.setCustomValidity("Name Required!");   
    }
    else{
        username.setCustomValidity("");
    }
});
/**
email.addEventListener("submit", (event) => {
    if(!email.checkValidity()){
        email.setCustomValidity("Email Required!");    
    }
    else{
        email.setCustomValidity("");
    }
});

comments.addEventListener("submit", (event) => {
    if(!comments.checkValidity()){
        comments.setCustomValidity("Comments Required!");    
    }
    else{
        comments.setCustomValidity("");
    }
});

form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault();
        displayErrorMessages();
    } else {
        infoOutput.textContent = '';
    }
});

function displayErrorMessages() {
    validateField(username);
    validateField(email);
    validateField(comments);
}
**/
function validateField(field) {
    if (!field.checkValidity()) {
        field.classList.add('flash');
        const errorOutput = document.querySelector(`output[for="${field.id}"]`);
        errorOutput.textContent = field.validationMessage;
        errorOutput.classList.add('error');
        setTimeout(() => {
            field.classList.remove('flash');
            errorOutput.classList.remove('error');
            errorOutput.textContent = '';
        }, 3000);
    }
}

comments.addEventListener('input', function () {
    const maxLength = parseInt(comments.getAttribute('maxlength'));
    const remainingChars = maxLength - comments.value.length;

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
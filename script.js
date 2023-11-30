const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-']+(\s[A-Za-zÀ-ÖØ-öø-ÿ-']+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const textRegex = /^[\s\S]{0,200}$/;


document.addEventListener("DOMContentLoaded", function () {
    const username = document.getElementById("name");
    const userEmail = document.getElementById("email");
    const userComment = document.getElementById("comments");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const commentError = document.getElementById("comments-error");
    const commentInfo = document.getElementById("comments-info");
    const formErrors = [];
    const errors = document.getElementById("form-errors");
    commentInfo.innerHTML = "Characters left: 200";
    /** 
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    commentError.innerHTML = "";
    **/
    document.getElementById("submit-button").addEventListener("click", (event) => {
        validComments = textRegex.test(userComment.value);
        validName = nameRegex.test(username.value);
        validEmail = emailRegex.test(userEmail.value);
        if (!(validComments && validName && validEmail)) {
            let errorList = {
                name: username.value,
                email: userEmail.value,
                comments: userComment.value,
                error: "Unknown error"
            };
            if (!validName) {
                username.setCustomValidity("Name Error");
                errorList.error = "name error";
            }
            else if (!validEmail) {
                userEmail.setCustomValidity("Email Format Error");
                errorList.error = "email error";
            }
            else if (!validComments) {
                if (userComment.value.length > 200) {
                    userComment.setCustomValidity("Comments Too Long");
                    errorList.error = "comments too long";
                }
                else {
                    userComment.setCustomValidity("Comments Error");
                    errorList.error = "comments error";
                }
            }
            formErrors.push(JSON.stringify(errorList));
            event.preventDefault();
        }
        else {
            userComment.setCustomValidity("");
            username.setCustomValidity("");
            userEmail.setCustomValidity("");
            errors.value = formErrors;
        }
        userComment.reportValidity();
        username.reportValidity();
        userEmail.reportValidity();
    });
    
    userComment.addEventListener("input", function (e) {
        commentError.classList.remove("form-error");
        commentInfo.innerHTML = "Characters left: " + (200 - e.target.value.length);
        validComments = textRegex.test(e.target.value);
        if (!validComments) {
            if (e.target.value.length < 1) commentError.innerHTML = "Please enter proper comments.";
            commentError.classList.add("form-error");
        }
        else commentError.innerHTML = "";
    });
    username.addEventListener("input", function (e) {
        nameError.classList.remove("form-error");
        validName = nameRegex.test(e.target.value);
        if (!validName) {
            nameError.innerHTML = "Please enter a valid name.";
            nameError.classList.add("form-error");
            username.style.backgroundColor = "rgb(255, 179, 178)";
        }
        else {
            nameError.innerHTML = "";
            username.style.backgroundColor = "white";
        }
    });
    userEmail.addEventListener("input", function (e) {
        emailError.classList.remove("form-error");
        validEmail = emailRegex.test(e.target.value);
        if (!validEmail) {
            emailError.innerHTML = "Please enter a valid email.";
            emailError.classList.add("form-error");
            userEmail.style.backgroundColor = "rgb(255, 179, 178)";
        }
        else {
            emailError.innerHTML = "";
            userEmail.style.backgroundColor = "white";
        }
    });
});


function changeMode() {
    var body = document.body;
    
    // toggle the theme
    body.classList.toggle("dark-theme");
    let button = document.getElementById('button');
    
    // change the button text
    if (button.innerHTML == "Dark Mode") {
       button.innerHTML = "Normal Mode";
    } else {
       button.innerHTML = "Dark Mode"
    }
 }

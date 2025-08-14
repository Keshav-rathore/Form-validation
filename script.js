const username = document.getElementById('name');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const submitButton = document.getElementById('submitbtn');

// Validation functions
function validateUsername() {
    const value = username.value;
    if (value.trim().length < 3) {
        document.getElementById('name-error').textContent = 'Username must be at least 3 characters.';
        return false;
    }
    const namePattern = /^[a-zA-Z0-9\s]+$/;// regex for alphanumeric and spaces
    if (!namePattern.test(value)) {
        document.getElementById('name-error').textContent = 'Only letters, numbers, and spaces allowed.';
        return false;
    }
    document.getElementById('name-error').textContent = '';
    return true;
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        return false;
    }
    document.getElementById('email-error').textContent = '';
    return true;
}

function validateDob() {
    const today = new Date();
    const birthDate = new Date(dob.value);
    if (dob.value === '' || birthDate >= today) {
        document.getElementById('dob-error').textContent = 'Please enter a valid date of birth.';
        return false;
    }
    document.getElementById('dob-error').textContent = '';
    return true;
}

function validatePassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordPattern.test(password.value)) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 chars, include uppercase, lowercase & number.';
        return false;
    }
    document.getElementById('password-error').textContent = '';
    return true;
}

function validateConfirmPassword() {
    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
        return false;
    }
    document.getElementById('confirm-password-error').textContent = '';
    return true;
}

// Check all validations and enable submit
function checkAllValidations() {
    if (
        validateUsername() &&
        validateEmail() &&
        validateDob() &&
        validatePassword() &&
        validateConfirmPassword()
    ) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// hide the error message whne user revisit the field to correct the mistake. it's optional
[username, email, dob, password, confirmPassword].forEach(input => {
    input.addEventListener('focus', () => {
        const errorId = input.id + '-error';
        document.getElementById(errorId).textContent = '';
    });
});

//check the validty when user enter the complete input
username.addEventListener('blur', () => { validateUsername(); checkAllValidations(); });
email.addEventListener('blur', () => { validateEmail(); checkAllValidations(); });
dob.addEventListener('blur', () => { validateDob(); checkAllValidations(); });
password.addEventListener('blur', () => { validatePassword(); checkAllValidations(); });
confirmPassword.addEventListener('blur', () => { validateConfirmPassword(); checkAllValidations(); });


// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = 'Hide';
        } else {
            input.type = 'password';
            btn.textContent = 'Show';
        }
    });
});

// prevent actual form submission and clear input fields
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    username.value = '';
    email.value = '';
    dob.value = '';
    password.value = '';
    confirmPassword.value = '';
    alert('Form submitted successfully!');
});

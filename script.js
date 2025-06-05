// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8tojtuCHSgSY3jdrbal8BH4cq1UU1KLI",
  authDomain: "idkbruh-c8cb4.firebaseapp.com",
  projectId: "idkbruh-c8cb4",
  storageBucket: "idkbruh-c8cb4.firebasestorage.app",
  messagingSenderId: "155774984997",
  appId: "1:155774984997:web:5ddc18b335e3cb7c80b0cc",
  measurementId: "G-92XKJRD79B"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);

document.addEventListener('DOMContentLoaded', function () {
    const emailForm = document.getElementById('email-form');
    const passwordForm = document.getElementById('password-form');
    const emailStep = document.getElementById('email-step');
    const passwordStep = document.getElementById('password-step');
    const emailInput = document.getElementById('email');
    const displayedEmail = document.getElementById('displayed-email');
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password');
    const userIdentifierChip = document.getElementById('user-identifier-chip');

    // Handle Email Step Submission
    if (emailForm) {
        emailForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent actual form submission
            const emailValue = emailInput.value;

            if (emailValue) {
                // Simulate storing email (in a real scenario, this would be more complex)
                // For this demo, we just display it on the next step.
                displayedEmail.textContent = emailValue;

                // Switch to password step
                emailStep.style.display = 'none';
                passwordStep.style.display = 'block';
                passwordInput.focus(); // Focus on password field
            } else {
                // Basic validation feedback (could be more sophisticated)
                alert('Please enter your email or phone.');
            }
        });
    }

    // Handle Password Step Submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent actual form submission
            const passwordValue = passwordInput.value;

            if (passwordValue) {
                // Sign in with email and password
                auth.signInWithEmailAndPassword(displayedEmail.textContent, passwordValue)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log('User signed in:', user);
                        alert('Sign in successful!');
                        // Optionally, reset or redirect
                        // emailForm.reset();
                        // passwordForm.reset();
                        // emailStep.style.display = 'block';
                        // passwordStep.style.display = 'none';
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error('Error signing in:', errorCode, errorMessage);
                        alert('Error signing in: ' + errorMessage);
                    });
            } else {
                alert('Please enter your password.');
            }
        });
    }

    // Show/Hide Password functionality
    if (showPasswordCheckbox && passwordInput) {
        showPasswordCheckbox.addEventListener('change', function () {
            if (showPasswordCheckbox.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }

    // Make the user identifier chip act like a button to go back (optional)
    if (userIdentifierChip && emailStep && passwordStep) {
        userIdentifierChip.addEventListener('click', function() {
            passwordStep.style.display = 'none';
            emailStep.style.display = 'block';
            emailInput.focus();
            // Consider clearing the password field if going back
            // passwordInput.value = '';
            // if (showPasswordCheckbox.checked) {
            //     showPasswordCheckbox.checked = false;
            //     passwordInput.type = 'password';
            // }
        });
        // Add keyboard accessibility
        userIdentifierChip.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    }

    // Focus on the first input field when the page loads (email step)
    if (emailInput && emailStep.style.display !== 'none') {
        emailInput.focus();
    }
});

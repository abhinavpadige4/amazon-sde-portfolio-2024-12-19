// Form JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    const formLoading = document.getElementById('formLoading');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Formspree endpoint (you'll need to replace this with your actual Formspree endpoint)
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id-here';
    
    // Initialize form
    initFormValidation();
    
    function initFormValidation() {
        // Real-time validation
        nameInput.addEventListener('input', () => validateName());
        emailInput.addEventListener('input', () => validateEmail());
        messageInput.addEventListener('input', () => validateMessage());
        
        // Form submission
        form.addEventListener('submit', handleSubmit);
    }
    
    function validateName() {
        const value = nameInput.value.trim();
        if (value.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            return false;
        } else if (value.length > 50) {
            nameError.textContent = 'Name must be less than 50 characters';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long';
            return false;
        } else if (value.length > 500) {
            messageError.textContent = 'Message must be less than 500 characters';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return; // Stop submission if validation fails
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
        formLoading.style.display = 'block';
        formSuccess.style.display = 'none';
        
        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Submit to Formspree (simulated for now)
        submitToFormspree(formData)
            .then(response => {
                // Hide loading state
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
                formLoading.style.display = 'none';
                
                // Show success message
                formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                formSuccess.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                // Hide loading state
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
                formLoading.style.display = 'none';
                
                // Show error message
                formSuccess.textContent = 'Oops! Something went wrong. Please try again later.';
                formSuccess.style.display = 'block';
                formSuccess.style.color = '#ef4444';
                
                console.error('Form submission error:', error);
            });
    }
    
    // Simulated Formspree submission (replace with actual fetch call)
    function submitToFormspree(formData) {
        // In a real implementation, this would be:
        // return fetch(FORMSPREE_ENDPOINT, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });
        
        // For demonstration, we'll simulate a successful submission
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo purposes
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500); // Simulate network delay
        });
    }
    
    // Accessibility enhancements
    // Add aria-describedby to inputs for error messages
    nameInput.setAttribute('aria-describedby', 'nameError');
    emailInput.setAttribute('aria-describedby', 'emailError');
    messageInput.setAttribute('aria-describedby', 'messageError');
    
    // Focus first invalid field on submit attempt
    form.addEventListener('invalid', function(e) {
        e.preventDefault();
        const invalidElement = e.target;
        if (invalidElement) {
            invalidElement.focus();
        }
    }, true);
});
/* ===================================
   FORM VALIDATION & SUBMISSION
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
});

// ========== CONTACT FORM INITIALIZATION ==========
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        // Real-time validation on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', handleFormSubmit);
    }
}

// ========== FORM SUBMISSION HANDLER ==========
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate all fields
    const isValid = validateForm(form);

    if (isValid) {
        submitForm(form, formData);
    } else {
        showFormMessage('Please correct the errors in the form.', 'error');
        // Focus on first error field
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }
}

// ========== VALIDATE ENTIRE FORM ==========
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// ========== VALIDATE INDIVIDUAL FIELD ==========
function validateField(field) {
    const fieldType = field.type;
    const fieldName = field.name;
    const fieldValue = field.value.trim();

    // Clear previous error
    clearFieldError(field);

    // Check if field is empty
    if (field.hasAttribute('required') && fieldValue === '') {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Specific validation based on field type
    switch (fieldName) {
        case 'name':
            return validateName(field, fieldValue);
        case 'email':
            return validateEmail(field, fieldValue);
        case 'phone':
            return validatePhone(field, fieldValue);
        case 'service':
            return validateService(field, fieldValue);
        case 'message':
            return validateMessage(field, fieldValue);
        default:
            return true;
    }
}

// ========== FIELD-SPECIFIC VALIDATORS ==========

function validateName(field, value) {
    if (value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters');
        return false;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        showFieldError(field, 'Name can only contain letters, spaces, hyphens, and apostrophes');
        return false;
    }

    return true;
}

function validateEmail(field, value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }

    return true;
}

function validatePhone(field, value) {
    // Remove all non-digit characters for validation
    const digitsOnly = value.replace(/\D/g, '');

    if (digitsOnly.length < 10) {
        showFieldError(field, 'Please enter a valid phone number (at least 10 digits)');
        return false;
    }

    return true;
}

function validateService(field, value) {
    if (value === '') {
        showFieldError(field, 'Please select a service');
        return false;
    }

    return true;
}

function validateMessage(field, value) {
    if (value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters');
        return false;
    }

    if (value.length > 1000) {
        showFieldError(field, 'Message must not exceed 1000 characters');
        return false;
    }

    return true;
}

// ========== ERROR DISPLAY FUNCTIONS ==========

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';

        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
}

function hideFormMessage() {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

// ========== FORM SUBMISSION ==========

function submitForm(form, formData) {
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    hideFormMessage();

    // Convert FormData to object for easier handling
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Log form data (in production, this would be sent to a server)
    console.log('Form Data:', data);

    // Simulate API call (replace with actual API endpoint in production)
    setTimeout(() => {
        // Simulate successful submission
        const success = true; // In production, check actual API response

        if (success) {
            showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            form.reset();

            // Optional: Send email notification or save to database
            // sendEmailNotification(data);
            // saveToDatabase(data);
        } else {
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        }

        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }, 2000); // 2 second delay to simulate network request
}

// ========== HELPER FUNCTIONS ==========

// Format phone number as user types (optional)
function formatPhoneNumber(input) {
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            // Format as (XXX) XXX-XXXX for display (optional)
            if (value.length >= 10) {
                value = value.substring(0, 10);
                const formatted = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
                e.target.value = formatted;
            }
        });
    }
}

// Character counter for message field (optional)
function addCharacterCounter() {
    const messageField = document.getElementById('message');

    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: #666; margin-top: 0.25rem;';

        messageField.parentNode.appendChild(counter);

        messageField.addEventListener('input', function () {
            const length = this.value.length;
            const max = 1000;
            counter.textContent = `${length} / ${max} characters`;

            if (length > max) {
                counter.style.color = '#e74c3c';
            } else {
                counter.style.color = '#666';
            }
        });

        // Initialize counter
        counter.textContent = `0 / 1000 characters`;
    }
}

// Initialize optional features
addCharacterCounter();

// ========== EMAIL INTEGRATION (For Production) ==========

/*
// Example function to send email via API
async function sendEmailNotification(data) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: 'info@mpethaconstruction.co.za',
                subject: `New Contact Form Submission - ${data.service}`,
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error };
    }
}

// Example function to save to database
async function saveToDatabase(data) {
    try {
        const response = await fetch('/api/save-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Database save error:', error);
        return { success: false, error };
    }
}
*/

// ========== SPAM PROTECTION ==========

// Simple honeypot field (add to HTML if needed)
function addHoneypot() {
    const form = document.getElementById('contactForm');
    if (form) {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        form.appendChild(honeypot);
    }
}

addHoneypot();

// Check honeypot on submit
function checkHoneypot(form) {
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value !== '') {
        // Likely spam
        return false;
    }
    return true;
}
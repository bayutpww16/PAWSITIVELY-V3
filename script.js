// Main JavaScript file for login functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded successfully!');
    
    // Initialize form interactions
    initializeFormValidation();
    initializeAnimations();
});

// Form validation
function initializeFormValidation() {
    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }
    
    // Real-time validation
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearErrors);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', clearErrors);
    }
}

function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Email validation
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    if (email && !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    if (password && password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = '#e53e3e';
    field.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearErrors() {
    // Remove all field errors
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    // Reset field styling
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.style.borderColor = '#e2e8f0';
        input.style.boxShadow = 'none';
    });
}

// Google login handler
function handleGoogleLogin() {
    // Show loading state
    const googleBtn = document.querySelector('.google-btn');
    const originalText = googleBtn.innerHTML;
    
    googleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" class="animate-spin">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        Connecting...
    `;
    
    googleBtn.disabled = true;
    
    // Simulate Google OAuth process
    setTimeout(() => {
        alert('Google login integration would be implemented here.\n\nIn a real application, this would redirect to Google OAuth and handle the authentication flow.');
        
        // Reset button
        googleBtn.innerHTML = originalText;
        googleBtn.disabled = false;
    }, 2000);
}

// Sign up handler
function handleSignUp() {
    alert('Sign up functionality would be implemented here.\n\nThis would typically redirect to a registration page or show a registration modal.');
}

// Initialize animations
function initializeAnimations() {
    // Add entrance animations
    const container = document.querySelector('.login-form-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.6s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add focus animations to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Demo credentials helper
function showDemoCredentials() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput && passwordInput) {
        emailInput.value = 'demo@example.com';
        passwordInput.value = 'password';
        
        // Add visual feedback
        emailInput.style.background = '#f0fff4';
        passwordInput.style.background = '#f0fff4';
        
        setTimeout(() => {
            emailInput.style.background = '';
            passwordInput.style.background = '';
        }, 1000);
    }
}

// Add demo credentials button (for testing)
document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.login-form-container');
    if (formContainer) {
        const demoBtn = document.createElement('button');
        demoBtn.type = 'button';
        demoBtn.textContent = 'Use Demo Credentials';
        demoBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 0.5rem 1rem;
            background: #4299e1;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 0.75rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        `;
        
        demoBtn.addEventListener('click', showDemoCredentials);
        demoBtn.addEventListener('mouseenter', () => demoBtn.style.opacity = '1');
        demoBtn.addEventListener('mouseleave', () => demoBtn.style.opacity = '0.7');
        
        formContainer.style.position = 'relative';
        formContainer.appendChild(demoBtn);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + D for demo credentials
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        showDemoCredentials();
    }
    
    // Enter to submit form when focused on inputs
    if (e.key === 'Enter' && (e.target.type === 'email' || e.target.type === 'password')) {
        const form = document.querySelector('.login-form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form-fields');
    const googleBtn = document.querySelector('.google-btn');
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmation = document.getElementById('confirmation').value;
        const terms = document.getElementById('terms').checked;
        
        // Reset previous error states
        clearErrors();
        
        let isValid = true;
        
        // Validate name
        if (name.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        // Validate password confirmation
        if (password !== confirmation) {
            showError('confirmation', 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms
        if (!terms) {
            showError('terms', 'You must agree to the terms and privacy policy');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            
            // Here you would typically send the data to your server
            console.log('Form submitted successfully:', {
                name,
                email,
                password: '***hidden***'
            });
        }
    });
    
    // Google sign up
    googleBtn.addEventListener('click', function() {
        // Add loading state
        this.innerHTML = '<div class="loading-spinner"></div>Signing up...';
        this.disabled = true;
        
        // Simulate Google OAuth (replace with actual implementation)
        setTimeout(() => {
            alert('Google sign-up would be implemented here');
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
            `;
            this.disabled = false;
        }, 2000);
    });
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updatePasswordStrength(strength);
    });
    
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group') || field.closest('.terms-checkbox');
        
        // Add error class
        formGroup.classList.add('error');
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert error message
        formGroup.appendChild(errorElement);
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const errorFields = document.querySelectorAll('.error');
        
        errorElements.forEach(el => el.remove());
        errorFields.forEach(el => el.classList.remove('error'));
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>Account Created Successfully!</h3>
            <p>Welcome to Pawsitively! Please check your email to verify your account.</p>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 6) strength += 1;
        if (password.length >= 10) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return strength;
    }
    
    function updatePasswordStrength(strength) {
        // Remove existing strength indicator
        const existingIndicator = document.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        if (strength > 0) {
            const strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength';
            
            const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
            const strengthColors = ['#ff4757', '#ff6b7a', '#ffa726', '#66bb6a', '#4caf50', '#2e7d32'];
            
            strengthIndicator.innerHTML = `
                <div class="strength-bar">
                    <div class="strength-fill" style="width: ${(strength / 6) * 100}%; background-color: ${strengthColors[strength - 1]}"></div>
                </div>
                <span class="strength-text" style="color: ${strengthColors[strength - 1]}">${strengthLevels[strength - 1]}</span>
            `;
            
            const passwordGroup = document.getElementById('password').closest('.form-group');
            passwordGroup.appendChild(strengthIndicator);
        }
    }
    
    // Add some interactive animations
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.5}s`;
        star.style.animation = 'twinkle 3s ease-in-out infinite';
    });
});

// Add CSS for additional features
const additionalStyles = `
    .error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1) !important;
    }
    
    .error-message {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .error-message::before {
        content: '⚠';
    }
    
    .success-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        text-align: center;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .success-icon {
        width: 60px;
        height: 60px;
        background: #4caf50;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        margin: 0 auto 1rem;
    }
    
    .password-strength {
        margin-top: 0.5rem;
    }
    
    .strength-bar {
        height: 4px;
        background: #e0e0e0;
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 0.25rem;
    }
    
    .strength-fill {
        height: 100%;
        transition: all 0.3s ease;
    }
    
    .strength-text {
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #4285F4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 0.5rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.6; transform: rotate(35deg) scale(1); }
        50% { opacity: 1; transform: rotate(35deg) scale(1.2); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
<?php
session_start();

// Basic configuration
$error_message = '';
$success_message = '';

// Handle form submission
if ($_POST) {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $remember = isset($_POST['remember']) ? true : false;
    
    // Basic validation
    if (empty($email) || empty($password)) {
        $error_message = 'Email and password are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please enter a valid email address.';
    } else {
        // Demo authentication - in real app, check against database
        if ($email === 'demo@example.com' && $password === 'password') {
            $_SESSION['user_logged_in'] = true;
            $_SESSION['user_email'] = $email;
            $success_message = 'Login successful! Welcome back.';
        } else {
            $error_message = 'Invalid email or password.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://public-frontend-cos.metadl.com/mgx/img/favicon.png" type="image/png">
    <title>Login - Pet Care</title>
    <link rel="stylesheet" href="./style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="login-container">
        <!-- Background Stars -->
        <div class="stars">
            <div class="star star-1"></div>
            <div class="star star-2"></div>
            <div class="star star-3"></div>
            <div class="star star-4"></div>
            <div class="star star-5"></div>
            <div class="star star-6"></div>
        </div>
        
        <!-- Left Side - Pet Image -->
        <div class="left-section">
            <div class="pet-image">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=600&fit=crop&crop=center" alt="Dog and Cat" class="pets">
            </div>
        </div>
        
        <!-- Right Side - Login Form -->
        <div class="right-section">
            <div class="login-form-container">
                <h1 class="login-title">Log In</h1>
                
                <?php if ($error_message): ?>
                    <div class="alert alert-error">
                        <?php echo htmlspecialchars($error_message); ?>
                    </div>
                <?php endif; ?>
                
                <?php if ($success_message): ?>
                    <div class="alert alert-success">
                        <?php echo htmlspecialchars($success_message); ?>
                    </div>
                <?php endif; ?>
                
                <!-- Google Login Button -->
                <div class="google-section">
                    <p class="continue-text">Continue With :</p>
                    <button type="button" class="google-btn" onclick="handleGoogleLogin()">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                    </button>
                </div>
                
                <div class="divider">
                    <span>Or</span>
                </div>
                
                <!-- Login Form -->
                <form method="POST" class="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email Address"
                            value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>"
                            required
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password"
                            required
                        >
                    </div>
                    
                    <div class="form-options">
                        <label class="checkbox-container">
                            <input type="checkbox" name="remember" <?php echo isset($_POST['remember']) ? 'checked' : ''; ?>>
                            <span class="checkmark"></span>
                            Remember Me
                        </label>
                    </div>
                    
                    <button type="submit" class="login-btn">Log In</button>
                </form>
                
                <div class="signup-link">
                    <p>Don't have an account? <a href="#" onclick="handleSignUp()">Sign Up</a></p>
                </div>
            </div>
        </div>
    </div>
    
    <script src="./script.js"></script>
</body>
</html>
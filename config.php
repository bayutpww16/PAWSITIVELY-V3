<?php
// Basic PHP configuration file for login system

// Database configuration (for future implementation)
define('DB_HOST', 'localhost');
define('DB_NAME', 'pet_care_db');
define('DB_USER', 'root');
define('DB_PASS', '');

// Application settings
define('APP_NAME', 'Pet Care Login');
define('APP_VERSION', '1.0.0');
define('SESSION_TIMEOUT', 3600); // 1 hour

// Security settings
define('HASH_ALGO', PASSWORD_DEFAULT);
define('SESSION_NAME', 'pet_care_session');

// Demo user credentials (in real app, this would be in database)
$demo_users = [
    'demo@example.com' => [
        'password' => password_hash('password', HASH_ALGO),
        'name' => 'Demo User',
        'role' => 'user'
    ],
    'admin@example.com' => [
        'password' => password_hash('admin123', HASH_ALGO),
        'name' => 'Admin User',
        'role' => 'admin'
    ]
];

// Function to validate user credentials
function validateUser($email, $password) {
    global $demo_users;
    
    if (!isset($demo_users[$email])) {
        return false;
    }
    
    return password_verify($password, $demo_users[$email]['password']);
}

// Function to get user info
function getUserInfo($email) {
    global $demo_users;
    
    if (isset($demo_users[$email])) {
        return [
            'email' => $email,
            'name' => $demo_users[$email]['name'],
            'role' => $demo_users[$email]['role']
        ];
    }
    
    return null;
}

// Function to start secure session
function startSecureSession() {
    // Set session name
    session_name(SESSION_NAME);
    
    // Set session cookie parameters
    session_set_cookie_params([
        'lifetime' => SESSION_TIMEOUT,
        'path' => '/',
        'domain' => '',
        'secure' => isset($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
    
    // Start session
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Regenerate session ID for security
    if (!isset($_SESSION['initiated'])) {
        session_regenerate_id(true);
        $_SESSION['initiated'] = true;
    }
}

// Function to check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] === true;
}

// Function to logout user
function logout() {
    $_SESSION = [];
    
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    session_destroy();
}

// Function to sanitize input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to generate CSRF token
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Function to verify CSRF token
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Initialize session
startSecureSession();
?>
<?php
// forgot-password.php
header("Content-Type: application/json");

// Simulated database of users (replace with actual DB in production)
$users = [
    "john@example.com" => ["name" => "John Doe", "reset_token" => null]
];

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"] ?? "");

if (!$email) {
    echo json_encode(["error" => "Email is required."]);
    exit;
}

if (!array_key_exists($email, $users)) {
    echo json_encode(["error" => "Email not found."]);
    exit;
}

// Generate reset token
$token = bin2hex(random_bytes(16));
$resetUrl = "http://yourdomain.com/reset-password.html?token=$token";

// Simulate saving the token (store in DB in real implementation)
$users[$email]["reset_token"] = $token;

// Simulate sending email
// You would use mail() in production or a library like PHPMailer
$message = "Hi {$users[$email]['name']}, click to reset your password: $resetUrl";
// mail($email, "Reset Your Password", $message);

// For testing purposes
echo json_encode(["message" => "Reset link sent to $email. (Check your inbox)", "reset_url" => $resetUrl]);
?>

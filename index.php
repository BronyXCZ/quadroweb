<?php
// Get the requested resource
$requestedResource = $_SERVER['REQUEST_URI'];

// Define the public directory
$publicDirectory = __DIR__ . '/public';

if (($requestedResource == '/') || ($requestedResource == '/index.html')) {
    require $publicDirectory . '/index.html';
    return;
} elseif (($requestedResource == '/updates') || ($requestedResource == '/updates.html')) {
    require $publicDirectory . '/updates.html';
    return;
}

// Serve other files directly from the public directory
if (file_exists($publicDirectory . $requestedResource)) {
    return false; // Let the server handle the request as is
}

// If the requested resource is not found, handle it as a 404 error
http_response_code(404);
echo '404 Not Found';
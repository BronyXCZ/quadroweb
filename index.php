<?php
// Get the requested resource
$requestedResource = $_SERVER['REQUEST_URI'];

header('Access-Control-Allow-Origin: http://quadrostudios.xyz');
header('Content-Type: application/json');

// Define the public directory
$publicDirectory = __DIR__ . '/public';

switch ($requestedResource) {
    case '/updates':
        require $publicDirectory . '/updates.html';
        break;
    default:
        require $publicDirectory . '/index.html';
        break;
}

// Serve other files directly from the public directory
if (file_exists($publicDirectory . $requestedResource)) {
    return false; // Let the server handle the request as is
}

// If the requested resource is not found, handle it as a 404 error
http_response_code(404);
echo '404 Not Found';
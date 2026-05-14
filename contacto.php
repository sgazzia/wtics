<?php

// 1. CONFIGURACIÓN: Cambia esto por tu correo real de Don Web
$destinatario = "sebastiangazzia@gmail.com"; 
$asunto = "Nueva consulta desde la web WTICS";

// 2. RECOGIDA DE DATOS
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST["mensaje"]));

    // 3. VALIDACIÓN BÁSICA
    if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor completa todos los campos correctamente.";
        exit;
    }

    // 4. CONSTRUCCIÓN DEL CUERPO DEL MENSAJE
    $contenido = "Has recibido un nuevo mensaje de contacto desde la web WTICS:\n\n";
    $contenido .= "De: $nombre\n";
    $contenido .= "Email: $email\n\n";
    $contenido .= "Detalle del mensaje:\n$mensaje\n";
    $contenido .= "\n---\nEnviado desde el formulario oficial de WTICS.";

    // 5. CABECERAS DEL CORREO (Crucial para que no llegue a SPAM)
    $headers = "From: Web WTICS <no-reply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 6. ENVÍO
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        http_response_code(200);
        echo "¡Mensaje enviado con éxito!";
    } else {
        http_response_code(500);
        echo "Error crítico del servidor al intentar procesar el mail.";
    }
} else {
    http_response_code(403);
    echo "Acceso denegado.";
}
?>
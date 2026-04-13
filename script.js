// --- CONFIGURACIÓN COMERCIAL ---
const MI_WHATSAPP = "5491100000000"; // <--- PONÉ TU NÚMERO DE WHATSAPP REAL AQUÍ (Solo números)

// --- FONDO DE ESTRELLAS 3D (Three.js) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha para fondo transparente
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 9000; i++) {
    // Esparcimos las estrellas en un cubo masivo
    starVertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 1;

// --- DICCIONARIO DE SERVICIOS IT ---
const serviciosInfo = {
    soporte: "NÚCLEO INFRAESTRUCTURA: Estado Online. Diagnóstico preventivo activo. Escribime para cotizar el mantenimiento de tu parque informático.",
    remoto: "PROTOCOLO REMOTO: Enlace seguro establecido. Soporte nivel 1 y 2 listo. Hacé clic en mí para consultar por abonos mensuales.",
    sistemas: "KERNEL OS: Optimización de sistemas Win/Linux. ¿Necesitás una instalación profesional o migración crítica? Pedime presupuesto.",
    redes: "NETWORKING: Seguridad de red blindada. Auditoría de conectividad, Firewalls y VPNs. Solicitá asistencia técnica ahora.",
    servidores: "SERVER CLUSTER: Implementación de servidores IIS/Linux. Potencia máxima para tu empresa. Cotizá tu proyecto hoy."
};

function updateService(tipo) {
    const bubble = document.getElementById('clipo-bubble');
    const coreVisual = document.getElementById('server-cluster-complex');
    
    // Cambiar mensaje de Clippo
    bubble.innerHTML = `<strong>SISTEMA:</strong> ${serviciosInfo[tipo]}<br><br><em>¡Hacé clic en CLIPO para WhatsApp!</em>`;
    
    // Efecto de parpadeo de "carga" en el núcleo
    coreVisual.style.filter = "brightness(2.5) drop-shadow(0 0 60px #00ffcc)";
    setTimeout(() => {
        coreVisual.style.filter = "drop-shadow(0 0 25px #00ffcc)";
    }, 400);
}

// --- ACCIÓN DE CONTACTO (WhatsApp) ---
function contactarWhatsApp() {
    const textoPredefinido = encodeURIComponent("Hola! Estoy en la terminal de SISTEMAS IT y me interesa solicitar una cotización.");
    window.open(`https://wa.me/${MI_WHATSAPP}?text=${textoPredefinido}`, '_blank');
}

// --- BUCLE DE ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);
    
    // Movimiento lento de las estrellas para profundidad
    stars.position.z += 0.3;
    if (stars.position.z > 500) stars.position.z = 0; // Loop de estrellas
    
    renderer.render(scene, camera);
}

// Ajuste automático de tamaño de ventana
window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

animate();
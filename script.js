// =========================================
// SISTEMA VETERINARIO - LÓGICA Y VALIDACIONES
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. MANEJO DEL FORMULARIO DE REGISTRO
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (nombre.length < 3) {
                mostrarAlerta('El nombre debe tener al menos 3 caracteres.');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                mostrarAlerta('Ingresa un correo electrónico válido.');
                return;
            }

            if (telefono.length < 8) {
                mostrarAlerta('El teléfono debe tener al menos 8 dígitos.');
                return;
            }

            if (password.length < 6) {
                mostrarAlerta('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (password !== confirmPassword) {
                mostrarAlerta('Las contraseñas no coinciden.');
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem('usuariosVeterinaria')) || [];
            
            const existeCorreo = usuarios.some(u => u.email === email);
            if (existeCorreo) {
                mostrarAlerta('Este correo ya se encuentra registrado.');
                return;
            }

            const nuevoUsuario = { nombre, email, telefono, password };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuariosVeterinaria', JSON.stringify(usuarios));

            alert('¡Usuario registrado con éxito! Serás redirigido al inicio de sesión.');
            window.location.href = 'index.html';
        });
    }

    // 2. MANEJO DEL FORMULARIO DE LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (!email || !password) {
                mostrarAlerta('Por favor completa todos los campos.');
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem('usuariosVeterinaria')) || [];
            const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

            if (usuarioValido) {
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
                window.location.href = 'dashboard.html';
            } else {
                mostrarAlerta('Correo o contraseña incorrectos. Si no tienes cuenta, regístrate primero.');
            }
        });
    }

    // 3. CERRAR SESIÓN (EN DASHBOARD Y OTRAS PÁGINAS)
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('usuarioActivo');
            window.location.href = 'index.html';
        });
    }

    // FUNCIÓN AUXILIAR PARA MOSTRAR ALERTAS EN PANTALLA
    function mostrarAlerta(mensaje) {
        const alertBox = document.getElementById('alertBox');
        if (alertBox) {
            alertBox.textContent = mensaje;
            alertBox.style.display = 'block';
        } else {
            alert(mensaje);
        }
    }
});
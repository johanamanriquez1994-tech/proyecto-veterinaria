// =========================================
// SISTEMA VETERINARIO - LÓGICA Y VALIDACIONES
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // USUARIO DE PRUEBA POR DEFECTO PARA INGRESAR DIRECTAMENTE
    const usuariosIniciales = JSON.parse(localStorage.getItem('usuariosVeterinaria')) || [];
    const existeAdmin = usuariosIniciales.some(u => u.email === 'admin@veterinaria.cl');
    
    if (!existeAdmin) {
        usuariosIniciales.push({
            nombre: 'Administrador Demo',
            email: 'admin@veterinaria.cl',
            telefono: '+56912345678',
            password: '123456'
        });
        localStorage.setItem('usuariosVeterinaria', JSON.stringify(usuariosIniciales));
    }

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
                mostrarAlerta('Correo o contraseña incorrectos.');
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

    // 4. MANEJO DE PACIENTES (PACIENTES.HTML)
    const pacienteForm = document.getElementById('pacienteForm');
    const tablaPacientes = document.getElementById('tablaPacientes');

    function cargarPacientes() {
        const pacientes = JSON.parse(localStorage.getItem('pacientesVeterinaria')) || [];
        
        // Actualizar contador en dashboard si existe
        const totalPacientesElem = document.getElementById('totalPacientes');
        if (totalPacientesElem) {
            totalPacientesElem.textContent = pacientes.length;
        }

        if (!tablaPacientes) return;
        tablaPacientes.innerHTML = '';

        if (pacientes.length === 0) {
            tablaPacientes.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 1rem; color:#a0aec0;">No hay pacientes registrados aún.</td></tr>';
            return;
        }

        pacientes.forEach((p, index) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #edf2f7';
            tr.innerHTML = `
                <td style="padding: 0.75rem; font-weight:600;">${p.nombreMascota}</td>
                <td style="padding: 0.75rem;">${p.especie}</td>
                <td style="padding: 0.75rem;">${p.raza}</td>
                <td style="padding: 0.75rem;">${p.edad} años</td>
                <td style="padding: 0.75rem;">${p.dueno}</td>
                <td style="padding: 0.75rem;">
                    <button onclick="eliminarPaciente(${index})" style="background:#e53e3e; color:white; border:none; padding:0.3rem 0.6rem; border-radius:4px; cursor:pointer;">Eliminar</button>
                </td>
            `;
            tablaPacientes.appendChild(tr);
        });
    }

    if (pacienteForm) {
        pacienteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombreMascota = document.getElementById('nombreMascota').value.trim();
            const especie = document.getElementById('especie').value;
            const raza = document.getElementById('raza').value.trim();
            const edad = document.getElementById('edad').value;
            const dueno = document.getElementById('dueno').value.trim();

            if (nombreMascota.length < 2) {
                mostrarAlerta('El nombre de la mascota debe tener al menos 2 letras.');
                return;
            }

            if (!especie) {
                mostrarAlerta('Selecciona una especie.');
                return;
            }

            if (raza.length < 2) {
                mostrarAlerta('Ingresa una raza válida.');
                return;
            }

            if (edad === '' || parseInt(edad) < 0) {
                mostrarAlerta('Ingresa una edad válida.');
                return;
            }

            if (dueno.length < 3) {
                mostrarAlerta('El nombre del dueño debe tener al menos 3 letras.');
                return;
            }

            const pacientes = JSON.parse(localStorage.getItem('pacientesVeterinaria')) || [];
            pacientes.push({ nombreMascota, especie, raza, edad, dueno });
            localStorage.setItem('pacientesVeterinaria', JSON.stringify(pacientes));

            pacienteForm.reset();
            cargarPacientes();
            alert('¡Paciente registrado exitosamente!');
        });
    }

    window.eliminarPaciente = function(index) {
        if (confirm('¿Estás seguro de eliminar este paciente?')) {
            const pacientes = JSON.parse(localStorage.getItem('pacientesVeterinaria')) || [];
            pacientes.splice(index, 1);
            localStorage.setItem('pacientesVeterinaria', JSON.stringify(pacientes));
            cargarPacientes();
        }
    };

    // 5. MANEJO DE CITAS (CITAS.HTML)
    const selectMascota = document.getElementById('selectMascota');
    const citaForm = document.getElementById('citaForm');
    const tablaCitas = document.getElementById('tablaCitas');

    function cargarSelectMascotas() {
        if (!selectMascota) return;
        const pacientes = JSON.parse(localStorage.getItem('pacientesVeterinaria')) || [];
        selectMascota.innerHTML = '<option value="">Selecciona una mascota...</option>';

        pacientes.forEach((p, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${p.nombreMascota} (${p.especie}) - Dueño: ${p.dueno}`;
            selectMascota.appendChild(option);
        });
    }

    function cargarCitas() {
        const citas = JSON.parse(localStorage.getItem('citasVeterinaria')) || [];
        
        // Actualizar contador en dashboard si existe
        const totalCitasElem = document.getElementById('totalCitas');
        if (totalCitasElem) {
            totalCitasElem.textContent = citas.length;
        }

        if (!tablaCitas) return;
        tablaCitas.innerHTML = '';

        if (citas.length === 0) {
            tablaCitas.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 1rem; color:#a0aec0;">No hay citas agendadas aún.</td></tr>';
            return;
        }

        citas.forEach((c, index) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #edf2f7';
            tr.innerHTML = `
                <td style="padding: 0.75rem; font-weight:600;">${c.nombreMascota}</td>
                <td style="padding: 0.75rem;">${c.dueno}</td>
                <td style="padding: 0.75rem;">${c.fecha}</td>
                <td style="padding: 0.75rem;">${c.hora} hrs</td>
                <td style="padding: 0.75rem;">${c.motivo}</td>
                <td style="padding: 0.75rem;">
                    <button onclick="eliminarCita(${index})" style="background:#e53e3e; color:white; border:none; padding:0.3rem 0.6rem; border-radius:4px; cursor:pointer;">Cancelar</button>
                </td>
            `;
            tablaCitas.appendChild(tr);
        });
    }

    if (citaForm) {
        citaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const idxMascota = selectMascota.value;
            const fecha = document.getElementById('fechaCita').value;
            const hora = document.getElementById('horaCita').value;
            const motivo = document.getElementById('motivoCita').value.trim();

            if (idxMascota === '') {
                mostrarAlerta('Selecciona una mascota de la lista.');
                return;
            }

            if (!fecha || !hora) {
                mostrarAlerta('Ingresa la fecha y hora de la cita.');
                return;
            }

            if (motivo.length < 3) {
                mostrarAlerta('Ingresa un motivo de consulta válido.');
                return;
            }

            const pacientes = JSON.parse(localStorage.getItem('pacientesVeterinaria')) || [];
            const paciente = pacientes[idxMascota];

            const citas = JSON.parse(localStorage.getItem('citasVeterinaria')) || [];
            citas.push({
                nombreMascota: paciente.nombreMascota,
                dueno: paciente.dueno,
                fecha,
                hora,
                motivo
            });

            localStorage.setItem('citasVeterinaria', JSON.stringify(citas));
            citaForm.reset();
            cargarCitas();
            alert('¡Cita agendada con éxito!');
        });
    }

    window.eliminarCita = function(index) {
        if (confirm('¿Deseas cancelar esta cita médica?')) {
            const citas = JSON.parse(localStorage.getItem('citasVeterinaria')) || [];
            citas.splice(index, 1);
            localStorage.setItem('citasVeterinaria', JSON.stringify(citas));
            cargarCitas();
        }
    };

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

    // CARGAR DATOS AL INICIAR
    cargarPacientes();
    cargarSelectMascotas();
    cargarCitas();
});
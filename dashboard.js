const rolDashboard = requerirSesion();

if (rolDashboard !== null) {
    document.getElementById("saludo").textContent = "Sesión iniciada como " + rolDashboard;

    document.getElementById("btnCitas").hidden = rolDashboard !== "admin";

    document.getElementById("btnPacientes").addEventListener("click", function () {
        window.location.href = "pacientes.html";
    });

    document.getElementById("btnCitas").addEventListener("click", function () {
        window.location.href = "citas.html";
    });

    document.getElementById("btnTratamientos").addEventListener("click", function () {
        window.location.href = "tratamiento.html";
    });

    document.getElementById("btnSalir").addEventListener("click", function () {
        abrirModal({
            tipo: "confirmar",
            titulo: "Cerrar sesión",
            mensaje: "¿Quieres salir del sistema?",
            textoAceptar: "Sí, salir",
            textoCancelar: "Cancelar",
            onAceptar: function () {
                cerrarSesion();
            }
        });
    });
}


const rolCitas = requerirSesion();

if (rolCitas !== null && rolCitas !== "admin") {
    document.getElementById("cajaCitas").hidden = true;

    abrirModal({
        titulo: "Acceso restringido",
        mensaje: "No tienes permiso para este módulo.",
        onAceptar: function () {
            window.location.replace("dashboard.html");
        }
    });
}

const formCita = document.getElementById("formCita");
const tablaCitas = document.getElementById("tablaCitas");

formCita.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const paciente = document.getElementById("pacienteCita").value.trim();
    const hora = document.getElementById("horaCita").value;
    const fecha = new Date().toLocaleDateString("es-CL");

    if (paciente === "" || hora === "") {
        abrirModal({
            titulo: "Faltan datos",
            mensaje: "Indica el paciente y la hora para agendar la cita."
        });
        return;
    }

    const fila = document.createElement("tr");

    const celdaPaciente = document.createElement("td");
    celdaPaciente.textContent = paciente;
    fila.appendChild(celdaPaciente);

    const celdaFecha = document.createElement("td");
    celdaFecha.textContent = fecha;
    fila.appendChild(celdaFecha);

    const celdaHora = document.createElement("td");
    celdaHora.textContent = hora;
    fila.appendChild(celdaHora);

    tablaCitas.appendChild(fila);

    formCita.reset();
    document.getElementById("pacienteCita").focus();

    abrirModal({
        titulo: "Cita agendada",
        mensaje: "La cita de " + paciente + " quedó agendada para hoy, " + fecha + ", a las " + hora + "."
    });
});

document.getElementById("btnVolver").addEventListener("click", function () {
    window.location.href = "dashboard.html";
});


requerirSesion();

const formPaciente = document.getElementById("formPaciente");
const tablaPacientes = document.getElementById("tablaPacientes");

formPaciente.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const mascota = document.getElementById("mascota").value.trim();
    const especie = document.getElementById("especie").value.trim();
    const dueno = document.getElementById("dueno").value.trim();

    if (mascota === "" || especie === "" || dueno === "") {
        abrirModal({
            titulo: "Faltan datos",
            mensaje: "Completa la mascota, la especie y el dueño para guardar el paciente."
        });
        return;
    }

    const fila = document.createElement("tr");

    const celdaMascota = document.createElement("td");
    celdaMascota.textContent = mascota;
    fila.appendChild(celdaMascota);

    const celdaEspecie = document.createElement("td");
    celdaEspecie.textContent = especie;
    fila.appendChild(celdaEspecie);

    const celdaDueno = document.createElement("td");
    celdaDueno.textContent = dueno;
    fila.appendChild(celdaDueno);

    tablaPacientes.appendChild(fila);

    formPaciente.reset();
    document.getElementById("mascota").focus();

    abrirModal({
        titulo: "Paciente guardado",
        mensaje: mascota + " (" + especie + ") quedó registrado."
    });
});

document.getElementById("btnVolver").addEventListener("click", function () {
    window.location.href = "dashboard.html";
});


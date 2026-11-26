requerirSesion();

function Tratamiento(id, paciente, descripcion) {
    this.id = id;
    this.paciente = paciente;
    this.descripcion = descripcion;
}

const formTratamiento = document.getElementById("formTratamiento");
const tablaTratamientos = document.getElementById("tablaTratamientos");

formTratamiento.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const id = document.getElementById("idTratamiento").value.trim();
    const paciente = document.getElementById("paciente").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (id === "" || paciente === "" || descripcion === "") {
        abrirModal({
            titulo: "Faltan datos",
            mensaje: "Completa el ID, el paciente y la descripción."
        });
        return;
    }

    const nuevoTratamiento = new Tratamiento(id, paciente, descripcion);

    const fila = document.createElement("tr");

    const celdaId = document.createElement("td");
    celdaId.textContent = nuevoTratamiento.id;
    fila.appendChild(celdaId);

    const celdaPaciente = document.createElement("td");
    celdaPaciente.textContent = nuevoTratamiento.paciente;
    fila.appendChild(celdaPaciente);

    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = nuevoTratamiento.descripcion;
    fila.appendChild(celdaDescripcion);

    tablaTratamientos.appendChild(fila);

    formTratamiento.reset();

    abrirModal({
        titulo: "Tratamiento guardado",
        mensaje: "El tratamiento #" + nuevoTratamiento.id + " de " + nuevoTratamiento.paciente + " quedó registrado."
    });
});

document.getElementById("btnVolver").addEventListener("click", function () {
    window.location.href = "dashboard.html";
});


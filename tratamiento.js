
function Tratamiento(id, paciente, descripcion, fecha) {
    this.id = id;
    this.paciente = paciente;
    this.descripcion = descripcion;
    this.fecha = fecha;
}
const formTratamiento = document.getElementById("formTratamiento");
formTratamiento.addEventListener("submit", function(evento) {
    evento.preventDefault(); 
    const id = document.getElementById("id").value;
    const paciente = document.getElementById("paciente").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha = document.getElementById("fecha").value;
    const nuevoTratamiento = new Tratamiento(id, paciente, descripcion, fecha);
    console.log("Tratamiento registrado:", nuevoTratamiento);

    alert("¡Tratamiento guardado con éxito!");
    formTratamiento.reset();
});
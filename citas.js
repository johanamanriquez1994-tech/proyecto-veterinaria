function guardarCita() {
    var paciente = document.getElementById("pacienteCita").value;
    var fecha = document.getElementById("fechaCita").value;
    var hora = document.getElementById("horaCita").value;


    if (paciente === "" || fecha === "" || hora === "") {
        alert("Por favor complete todos los campos");
        return;
    }

   
    if (fecha < "2026-11-03") {
        alert("No puede seleccionar fecha pasada");
        return;
    }


    alert("Cita agendada");
    
}
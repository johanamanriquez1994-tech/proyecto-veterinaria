function guardarCita() {
    var paciente = document.getElementById("pacienteCita").value;
    var fecha = document.getElementById("fechaCita").value;
    var hora = document.getElementById("horaCita").value;

    if (paciente === "" || fecha === "" || hora === "") {
        alert("Llena todos los campos de la cita");
    } else {
        var tabla = document.getElementById("tablaCitas");
        var fila = "<tr><td>" + paciente + "</td><td>" + fecha + "</td><td>" + hora + "</td></tr>";
        
        tabla.innerHTML += fila;

        document.getElementById("pacienteCita").value = "";
        document.getElementById("fechaCita").value = "";
        document.getElementById("horaCita").value = "";

        alert("Cita agendada");
    }
}
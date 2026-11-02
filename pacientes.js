function guardarPaciente() {
    var mascota = document.getElementById("mascota").value;
    var especie = document.getElementById("especie").value;
    var dueno = document.getElementById("dueno").value;

    if (mascota === "" || especie === "" || dueno === "") {
        alert("Llena todos los campos por favor");
    } else {
        var tabla = document.getElementById("tablaPacientes");
        var fila = "<tr><td>" + mascota + "</td><td>" + especie + "</td><td>" + dueno + "</td></tr>";
        
        tabla.innerHTML += fila;

        document.getElementById("mascota").value = "";
        document.getElementById("especie").value = "";
        document.getElementById("dueno").value = "";
        
        alert("Paciente guardado");
    }
}
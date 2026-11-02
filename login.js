function entrar() {
    var correo = document.getElementById("correo").value;
    var clave = document.getElementById("clave").value;

    if (correo === "admin@veterinaria.cl" && clave === "123456") {
        alert("¡Bienvenida!");
        location.href = "dashboard.html";
    } else {
        alert("Datos incorrectos");
    }
}
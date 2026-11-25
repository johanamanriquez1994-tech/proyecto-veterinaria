const USUARIOS = {
    "admin@veterinaria.cl": { clave: "123456", rol: "admin" },
    "vet@veterinaria.cl": { clave: "123456", rol: "veterinario" }
};

const formLogin = document.getElementById("formLogin");
const campoCorreo = document.getElementById("correo");
const campoClave = document.getElementById("clave");

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const correo = campoCorreo.value.trim().toLowerCase();
    const usuario = USUARIOS[correo];

    if (usuario === undefined || usuario.clave !== campoClave.value) {
        campoClave.value = "";
        campoClave.focus();

        abrirModal({
            titulo: "No pudimos iniciar sesión",
            mensaje: "El correo o la contraseña no son correctos."
        });
        return;
    }

    guardarRol(usuario.rol);

    abrirModal({
        titulo: "¡Bienvenido!",
        mensaje: "Sesión iniciada como " + usuario.rol + ".",
        onAceptar: function () {
            window.location.href = "dashboard.html";
        }
    });
});


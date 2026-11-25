/*
 * Sesion simulada sobre localStorage.
 * No hay backend: el rol se guarda en el navegador y cada pagina protegida
 * llama a requerirSesion() antes de inicializar su logica.
 */
const CLAVE_ROL = "rol";

function obtenerRol() {
    const rol = localStorage.getItem(CLAVE_ROL);

    if (rol === "admin" || rol === "veterinario") {
        return rol;
    }

    return null;
}

function guardarRol(rol) {
    if (rol === "admin" || rol === "veterinario") {
        localStorage.setItem(CLAVE_ROL, rol);
    }
}

function cerrarSesion() {
    localStorage.removeItem(CLAVE_ROL);
    window.location.href = "index.html";
}

function requerirSesion() {
    const rol = obtenerRol();

    if (rol === null) {
        window.location.replace("index.html");
    }

    return rol;
}


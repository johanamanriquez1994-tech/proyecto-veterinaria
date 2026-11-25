/*
 * Modal reutilizable, sin dependencias.
 * Modo informativo: abrirModal({ titulo: "Aviso", mensaje: "Texto" });
 * Modo confirmacion: abrirModal({ tipo: "confirmar", titulo: "Salir", mensaje: "Texto",
 *                                  onAceptar: function () { } });
 * Se cierra con el boton, con clic en el overlay o con la tecla Escape.
 */
let overlayModal = null;
let tituloModal = null;
let mensajeModal = null;
let botonAceptarModal = null;
let botonCancelarModal = null;
let focoAnterior = null;
let modoConfirmar = false;
let funcionAceptar = null;

function crearModal() {
    if (document.getElementById("modalOverlay") !== null) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "modalOverlay";
    overlay.className = "modal-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
        '<div class="modal" role="dialog" aria-modal="true" ' +
        'aria-labelledby="modal-titulo" aria-describedby="modal-mensaje">' +
        '    <h2 id="modal-titulo"></h2>' +
        '    <p id="modal-mensaje"></p>' +
        '    <div class="modal-acciones">' +
        '        <button type="button" class="btn-secundario" id="modalCancelar"></button>' +
        '        <button type="button" id="modalAceptar"></button>' +
        '    </div>' +
        '</div>';

    document.body.appendChild(overlay);

    overlayModal = document.getElementById("modalOverlay");
    tituloModal = document.getElementById("modal-titulo");
    mensajeModal = document.getElementById("modal-mensaje");
    botonAceptarModal = document.getElementById("modalAceptar");
    botonCancelarModal = document.getElementById("modalCancelar");

    overlayModal.addEventListener("click", function (evento) {
        if (evento.target === overlayModal) {
            cerrarModal(!modoConfirmar);
        }
    });

    botonAceptarModal.addEventListener("click", function () {
        cerrarModal(true);
    });

    botonCancelarModal.addEventListener("click", function () {
        cerrarModal(false);
    });
}

function cerrarModal(acepto) {
    if (overlayModal === null || overlayModal.hidden) {
        return;
    }

    overlayModal.hidden = true;
    document.body.classList.remove("modal-abierto");
    document.removeEventListener("keydown", alPresionarTecla);

    if (focoAnterior !== null) {
        focoAnterior.focus();
    }
    focoAnterior = null;

    if (modoConfirmar === false || acepto === true) {
        if (funcionAceptar !== null) {
            funcionAceptar();
        }
    }
    funcionAceptar = null;
}

function alPresionarTecla(evento) {
    if (evento.key === "Escape") {
        evento.preventDefault();
        cerrarModal(!modoConfirmar);
    }
}

function abrirModal(opciones) {
    crearModal();

    const config = opciones || {};

    modoConfirmar = config.tipo === "confirmar";
    tituloModal.textContent = config.titulo || "Aviso";
    mensajeModal.textContent = config.mensaje || "";
    botonAceptarModal.textContent = config.textoAceptar || "Entendido";
    botonCancelarModal.textContent = config.textoCancelar || "Cancelar";
    botonCancelarModal.hidden = modoConfirmar === false;
    funcionAceptar = config.onAceptar || null;

    focoAnterior = document.activeElement;
    overlayModal.hidden = false;
    document.body.classList.add("modal-abierto");
    document.addEventListener("keydown", alPresionarTecla);

    if (modoConfirmar) {
        botonCancelarModal.focus();
    } else {
        botonAceptarModal.focus();
    }
}


Sistema de Clínica Veterinaria

Prototipo de interfaz para una demo de clínica veterinaria, hecho con HTML, CSS y JavaScript plano. No tiene backend, ni dependencias, ni herramientas de compilación: se abre directamente en el navegador.

Módulos

- Login: acceso con correo y contraseña.
- Dashboard: panel principal con los módulos disponibles según el rol.
- Pacientes: registro de mascotas con su especie y su dueño.
- Citas: agendamiento de citas para el día de hoy.
- Tratamientos: registro de tratamientos por paciente.

Credenciales de demo

admin@veterinaria.cl / 123456 -> rol admin (ve todos los módulos)
vet@veterinaria.cl / 123456 -> rol veterinario (no ve Citas)

Los datos de pacientes, citas y tratamientos se guardan solo en memoria y se pierden al recargar o al cambiar de página. El rol sí queda guardado en localStorage hasta que se usa el botón Salir.

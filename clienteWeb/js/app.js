import { initSucursales } from "./sucursales.js";
import { initTurnos, turnos } from "./turnos.js";



initSucursales();
initTurnos();

// FORMULARIO RESERVA DE TURNOS 
reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    reservarTurno();
    initTurnos();
})

const reservarTurno = () => {
    const turno = document.querySelector(".turnosContainer .turno.selected").id
    console.log("reservar turno", turnos[turno-1])
}
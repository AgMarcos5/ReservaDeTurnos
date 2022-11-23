import { getPort, getUserId } from "./auth.js";
import { initSucursales } from "./sucursales.js";
import { initTurnos, turnos } from "./turnos.js";

initSucursales();
initTurnos();


// FORMULARIO RESERVA DE TURNOS 
reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();    
    solicitarTurno();
    initTurnos();
})

const solicitarTurno = async() => {
    const turnoHtml = document.querySelector(".turnosContainer .turno.selected")
    const form = document.getElementById('reservaForm');
    const email = form.elements['email'].value;

    if(turnoHtml){
        const id = turnoHtml.id
        const listaTurnos = await turnos;
        const turnoSeleccionado = listaTurnos[id-1];

        console.log(turnoSeleccionado)

        if(turnoSeleccionado.status == 0){ // turno libre 
            const userId = getUserId();
            const port = getPort();
            const rawResponse = await fetch(`http://localhost:${port}/api/reservas/solicitar/${id}`, {
                method: 'POST',
                body: JSON.stringify({userId})
            });
            const content = await rawResponse.json();

            console.log(content);
            
        }
    }
}

const reservarTurno = async () => {

}
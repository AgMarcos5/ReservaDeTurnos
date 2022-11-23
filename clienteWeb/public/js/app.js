import { getPort, getUserId } from "./auth.js";
import { initSucursales } from "./sucursales.js";
import { initTurnos, searchTurnos, turnos } from "./turnos.js";
import { buildQuery } from "./utils.js";

await initSucursales();
await initTurnos();


// BUSQUEDA
const searchButton =  document.querySelector('.options .searchWrapper .btn');

searchButton.addEventListener('click', () => {
    const inputSucursal = document.querySelector('.options #option-sucursal input').id;
    const inputDate = document.querySelector('.options #option-date input').value;

    let queryParams = {
        branchId : inputSucursal,
        dateTime: inputDate
    }
    //searchTurnos(queryParams)

    console.log(buildQuery(queryParams))
    searchTurnos(buildQuery(queryParams))
})


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

        if(turnoSeleccionado.status == 0 && email){ // turno libre 
            const userId = getUserId();
            const port = getPort();
            const rawResponse = await fetch(`http://localhost:${port}/api/reservas/solicitar/${id}`, {
                method: 'POST',
                body: JSON.stringify({userId})
            });
            const content = await rawResponse.json();

            if(rawResponse.status === 200){
                // Confirmar reserva
                console.log("respuesta solicitar",content);
                Swal.fire({
                    title: 'Confirmar la reserva?',
                    icon: 'question',
                    confirmButtonText: 'Confirmar'
                })
                .then( ({isConfirmed}) => {
                    console.log(isConfirmed)    
                    if(isConfirmed){
                        reservarTurno(port,id,{userId,email})
                    }
                })
            }
            else if(rawResponse.status === 400){
                console.log("respuesta solicitar",content);
                Swal.fire({
                    title: 'Error',
                    text: content.msg,
                    icon: 'error',
                    confirmButtonText: 'Confirmar'
                })
            }
            
            
        }
    }
}

const reservarTurno = async (port,id,body) => {

    const rawResponse = await fetch(`http://localhost:${port}/api/reservas/confirmar/${id}`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
    const content = await rawResponse.json();

    console.log("Reserva",content)

    Swal.fire({
        title: 'Reserva confirmada',
        icon: 'success',
        confirmButtonText: 'cerrar'
    })

}
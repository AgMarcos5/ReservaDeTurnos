//import { getPort, getUserId } from "./auth.js";
import { initReservas } from "./reservas.js";
import { initSucursales } from "./sucursales.js";
import { initTurnos, searchTurnos, turnos } from "./turnos.js";
//import { buildQuery, hide, toggle } from "./utils.js";

const init = async () => {
    const port = sessionStorage.getItem("PORT") || 3000;        
    const userId = sessionStorage.getItem("USERID") || 0;      

    await initSucursales(port);
    await initTurnos(port);
    await initReservas(port,userId);
}

init()

// LOGOUT BUTTON
const usernameDropdown = document.querySelector('.username-menu');
const optionUsername = document.getElementById('username');

document.addEventListener('click', event => {
    const isClickInsideUsername = usernameDropdown.contains(event.target) || optionUsername.contains(event.target);

    if (!isClickInsideUsername) {
      hide(usernameDropdown)
    }
})

username.addEventListener('click', () => {
    toggle(usernameDropdown)
})


// BUSQUEDA
const searchButton =  document.querySelector('.options .searchWrapper .btn');

searchButton.addEventListener('click', () => {
    const inputSucursal = document.querySelector('.options #option-sucursal input').id;
    const inputDate = document.querySelector('.options #option-date input').value;

    let queryParams = {
        branchId : inputSucursal,
        dateTime: inputDate
    }
    
    searchTurnos(3000,buildQuery(queryParams))
})


// FORMULARIO RESERVA DE TURNOS 
reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();    
    solicitarTurno();
    initTurnos();

})

const solicitarTurno = async() => {    
    // FORM turnos
    const turnoHtml = document.querySelector(".turnosContainer .turno.selected")
    const form = document.getElementById('reservaForm');
    const email = form.elements['email'].value;
    
    if(turnoHtml){
        const idReserva = turnoHtml.id
        const listaTurnos = await turnos;
        const turnoSeleccionado = listaTurnos[idReserva-1];

        if(turnoSeleccionado.status == 0 && email){ // turno libre 
           try {
                const config = await getConfig();
                const PORT =  config.PORT;
                const USERID = config.USERID;

                console.log("ID:",USERID)

                const rawResponse = await fetch(`http://localhost:${PORT}/api/reservas/solicitar/${idReserva}`, {
                    method: 'POST',
                    body: JSON.stringify({userId: USERID})
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
                            reservarTurno(PORT,idReserva,USERID,email)
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
           } catch (error) {
            console.log(error)
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo conectar con el servidor',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
           }
        }
    }
}

const reservarTurno = async (port,idReserva,userId,email) => {
    console.log("reservar",{userId,email})
    const rawResponse = await fetch(`http://localhost:${port}/api/reservas/confirmar/${idReserva}`, {
        method: 'POST',
        body: JSON.stringify({userId,email})
    });
    const content = await rawResponse.json();

    console.log("Reserva",content)

    Swal.fire({
        title: 'Reserva confirmada',
        icon: 'success',
        confirmButtonText: 'cerrar'
    })

}
import {getData} from './getData.js'
import { getSucursales } from './sucursales.js';

let reservas = [];

const initReservas = async (PORT, USERID) => {
    try {
        if(PORT)
            reservas = getData(`http://localhost:${PORT}/api/reservas?userId=${USERID}`);

        const auxReservas = await reservas;
        const sucursales = await getSucursales(PORT);
               
        listaReservas.innerHTML = '';
        auxReservas.map( reserva => {
            const sucursalName = sucursales.find( s => s.id == reserva.branchId).name;  
            const date = new Date(reserva.dateTime);

            listaReservas.innerHTML += `
            <div 
                class="turno" 
                id="${reserva.idReserva}"
            >
                <div>${sucursalName}</div>
                <div>${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}hs </div>
            </div>
            `
        })
        
        // Seleccionar turno
        const reservasHTML = document.querySelectorAll('#content-user .turnosContainer .turno');
        reservasHTML.forEach(reserva => {
            reserva.addEventListener('click', () => {
                if( !reserva.classList.contains('ocupado')){
                    document.querySelector("#content-user .turnosContainer .turno.selected")?.classList.remove("selected");
                    reserva.classList.add("selected");
                }
            });
        });
    } catch (error) {
        console.log(error)
        listaReservas.innerHTML += `
        <div 
        >
            <div>No se encontraron reservas</div>
        </div>
        `
    }
};



export {
    reservas,
    initReservas,
}

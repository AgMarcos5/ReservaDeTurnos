import {getData} from './getData.js'
import { getSucursales } from './sucursales.js';

let turnos = [];

const searchTurnos = async (PORT, queryParams = '') => {
    if(queryParams){
        turnos = getData(`http://localhost:${PORT}/api/reservas`+queryParams)
        initTurnos();
    }
}

const initTurnos = async (PORT) => {
    try {
        if(PORT)
            turnos = getData(`http://localhost:${PORT}/api/reservas`);

        const auxturnos = await turnos;
        const sucursales = await getSucursales(PORT);
               
        listaTurnos.innerHTML = '';
        auxturnos.map( turno => {
            const sucursalName = sucursales.find( s => s.id == turno.branchId).name;  
            const date = new Date(turno.dateTime);
            const ocupado = turno.status != 0 ? 'ocupado' : '';

            listaTurnos.innerHTML += `
            <div 
                class="turno ${ocupado}" 
                id="${turno.idReserva}"
            >
                <div>${sucursalName}</div>
                <div>${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}hs </div>
            </div>
            `
        })
        
        // Seleccionar turno
        const turnosHTML = document.querySelectorAll('.turnosContainer .turno');
        turnosHTML.forEach(turno => {
            turno.addEventListener('click', () => {
                if( !turno.classList.contains('ocupado')){
                    document.querySelector(".turnosContainer .turno.selected")?.classList.remove("selected");
                    turno.classList.add("selected");
                }
            });
        });
    } catch (error) {
        console.log(error)
        listaTurnos.innerHTML += `
        <div 
        >
            <div>No se encontraron turnos</div>
        </div>
        `
    }
};



export {
    turnos,
    initTurnos,
    searchTurnos,
}

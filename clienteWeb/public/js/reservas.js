import {getData} from './getData.js'
import { getSucursales } from './sucursales.js';

let reservas = [];

const initReservas = async (PORT, USERID, header) => {
    try {
        if(PORT)
            reservas = getData(`http://localhost:${PORT}/api/reservas?userId=${USERID}`,header);

        const auxReservas = await reservas;
        const sucursales = await getSucursales(PORT);
               
        listaReservas.innerHTML = '';

        // Ocurrió un error
        if('msg' in auxReservas){
            listaReservas.innerHTML += `
            <div 
            >
                <div>No se encontraron reservas</div>
            </div>
            `
            return;
        }

        auxReservas.map( reserva => {
            const sucursalName = sucursales.find( s => s.id == reserva.branchId).name;  
            const date = new Date(reserva.dateTime);

            listaReservas.innerHTML += `
            <div 
                class="turno" 
                id="r${reserva.idReserva}"
            >
                <div>
                    <div>${sucursalName}</div>
                    <div>${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}hs </div>
                </div>
                <div class="deleteIcon" data-value="${reserva.idReserva}"><img src="./images/delete.png"/></div>
            </div>
            `
        })
        
        // SELECCIONAR TURNO
        const reservasHTML = document.querySelectorAll('#content-user .turnosContainer .turno');
        reservasHTML.forEach(reserva => {
            reserva.addEventListener('click', () => {
                if( !reserva.classList.contains('ocupado')){
                    document.querySelector("#content-user .turnosContainer .turno.selected")?.classList.remove("selected");
                    reserva.classList.add("selected");
                }
            });
        });

                
        // BORRAR RESERVA
        const deleteHTML = document.querySelectorAll('#content-user .turnosContainer .turno .deleteIcon');
        deleteHTML.forEach(btn => {
            btn.addEventListener('click', async () => {
                const idReserva = btn.dataset.value
                const reservaHTML = document.querySelector(`#listaReservas #r${idReserva}`)
                const config = await getConfig();
                const PORT =  config.PORT;
                const USERID = config.USERID;

                const rawResponse = await fetch(`http://localhost:${PORT}/api/reservas/${idReserva}`, {
                    method: 'DELETE',
                    headers: header,
                    body: JSON.stringify({userId: USERID})
                });
                if(rawResponse.status === 200){
                    reservaHTML.remove();
                    if (document.getElementById('listaReservas').innerHTML.trim() == "") {
                        listaReservas.innerHTML += `
                        <div 
                        >
                            <div>No se encontraron reservas</div>
                        </div>
                        `
                    }
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

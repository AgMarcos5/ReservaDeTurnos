import {getData} from './getData.js'

let turnos = [];


const initTurnos = async () => {

    turnos = await getData("http://localhost:3000/api/reserva")

    listaTurnos.innerHTML = '';
    turnos.map( turno => {

        const ocupado = turno.userId != null ? 'ocupado' : '';

        listaTurnos.innerHTML += `
        <div 
            class="turno ${ocupado}" 
            id="${turno.id}"
        >
            <div>${turno.datetime}</div>
        </div>
        `
    })
    
    // Seleccionar turno
    const turnosHTML = document.querySelectorAll('.turnosContainer .turno');
    turnosHTML.forEach(turno => {
        turno.addEventListener('click', () => {
          document.querySelector(".turnosContainer .turno.selected")?.classList.remove("selected");
          turno.classList.add("selected");
        });
    });
   
};

export {
    turnos,
    initTurnos,
}

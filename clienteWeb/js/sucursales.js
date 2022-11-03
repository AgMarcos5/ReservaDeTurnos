import {getData} from './getData.js'
import { initMap } from './map.js';

let sucursales = [];


const initSucursales = async () => {

    sucursales = await getData("http://localhost:3000/api/sucursales")

    listaSucursales.innerHTML = '';
    sucursales.map( sucursal => {

        listaSucursales.innerHTML += `
        <div 
            class="sucursal" 
            id="${sucursal.id}"
        >
            ${sucursal.name}
        </div>
        `
    })

    // MAPA
    initMap(sucursales)
    
    // Seleccionar turno
    const sucursalesHTML = document.querySelectorAll('.sucursalesContainer ul .sucursal');
    sucursalesHTML.forEach(sucursal => {
        sucursal.addEventListener('click', () => {
          document.querySelector(".sucursalesContainer ul .sucursal.selected")?.classList.remove("selected");
          sucursal.classList.add("selected");
        });
    });
   
};

export {
    sucursales,
    initSucursales,
}

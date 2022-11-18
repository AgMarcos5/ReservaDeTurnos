import {getData} from './getData.js'
import { hide, show, toggle } from './utils.js';

let sucursales = [];

// show hide dropdown
const sucursalesDropdown = document.querySelector('.sucursalesContainer');

const optionSucursal = document.getElementById('option-sucursal');

optionSucursal.addEventListener('click', () => {
    toggle(sucursalesDropdown)
})


document.addEventListener('click', event => {
    const isClickInsideSucursales = sucursalesDropdown.contains(event.target) || optionSucursal.contains(event.target);

    if (!isClickInsideSucursales) {
      hide(sucursalesDropdown)
    }
})


const initSucursales = async () => {

    try {
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
        
        // Seleccionar sucursal
        const sucursalesHTML = document.querySelectorAll('.sucursalesContainer ul .sucursal');
        const inputSucursal = document.getElementById('sucursal');

        sucursalesHTML.forEach(sucursal => {
            sucursal.addEventListener('click', () => {
                const data = sucursales.find( s => s.id == sucursal.id);           
                
                const sucursalSeleccionada = document.querySelector(".sucursalesContainer ul .sucursal.selected");
                if(sucursal === sucursalSeleccionada){
                    sucursalSeleccionada.classList.remove("selected");
                    inputSucursal.value= '';
                } else{
                    sucursalSeleccionada?.classList.remove("selected");
                    sucursal.classList.add("selected");
                    inputSucursal.value= data.name;
                }
                hide(sucursalesDropdown);
            });
        });
    } catch (error) {
        listaSucursales.innerHTML += `
        <div 
            class="sucursal" 
        >
            No se encontraron sucursales
        </div>
        `
    }

    
   
};

export {
    sucursales,
    initSucursales,
}

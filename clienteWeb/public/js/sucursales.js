import {getData} from './getData.js'
import { hide, show, toggle } from './utils.js';

let sucursales = getData("http://localhost:3000/api/sucursales");

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

const initSucursales = () => {
    sucursales.then( s => {
        listaSucursales.innerHTML = "";
        s.map((sucursal) => {
          listaSucursales.innerHTML += `
                <div 
                    class="sucursal" 
                    id="${sucursal.id}"
                >
                    ${sucursal.name}
                </div>
                `;
        });

        // Seleccionar sucursal
        const sucursalesHTML = document.querySelectorAll('.sucursalesContainer ul .sucursal');
        const inputSucursal = document.querySelector('.options #option-sucursal input');

        sucursalesHTML.forEach(sucursal => {
            sucursal.addEventListener('click', () => {
                const data = s.find( s => s.id == sucursal.id);           
                
                const sucursalSeleccionada = document.querySelector(".sucursalesContainer ul .sucursal.selected");
                if(sucursal === sucursalSeleccionada){
                    sucursalSeleccionada.classList.remove("selected");
                    inputSucursal.value= '';
                    inputSucursal.id = '';
                } else{
                    sucursalSeleccionada?.classList.remove("selected");
                    sucursal.classList.add("selected");
                    inputSucursal.value= data.name;
                    inputSucursal.id = data.id;
                }
                hide(sucursalesDropdown);
            });
        });
    })
}



const initSucursales2 = async () => {
    try {
        const auxSucursales = await sucursales;

        listaSucursales.innerHTML = '';
        auxSucursales.map( sucursal => {

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
        const inputSucursal = document.querySelector('.options #option-sucursal input');

        sucursalesHTML.forEach(sucursal => {
            sucursal.addEventListener('click', () => {
                const data = auxSucursales.find( s => s.id == sucursal.id);           
                
                const sucursalSeleccionada = document.querySelector(".sucursalesContainer ul .sucursal.selected");
                if(sucursal === sucursalSeleccionada){
                    sucursalSeleccionada.classList.remove("selected");
                    inputSucursal.value= '';
                    inputSucursal.id = '';
                } else{
                    sucursalSeleccionada?.classList.remove("selected");
                    sucursal.classList.add("selected");
                    inputSucursal.value= data.name;
                    inputSucursal.id = data.id;
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

const getSucursales = () => sucursales;

export {
    sucursales,
    getSucursales,
    initSucursales,
}

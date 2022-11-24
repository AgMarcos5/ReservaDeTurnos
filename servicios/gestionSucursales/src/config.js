
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    SUCURSALES_PORT : process.env.SUCURSALES_PORT || 3000,
    PATH_JSON: "/../../sucursales.json",

    MAP_ID: "a7454b8d-a1f7-4732-8c35-7865f872e111",
    MAP_BASEURL: "https://cartes.io/api/maps",
    
}

module.exports = {
    config
}


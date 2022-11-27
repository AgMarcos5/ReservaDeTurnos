
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    SUCURSALES_PORT : process.env.SUCURSALES_PORT || 3000,
    PATH_JSON: "/../../sucursales.json",
    MAP_ID: "e5b54055-7613-4af6-8eea-8c0d8cc8bb99",
    MAP_BASEURL: "https://cartes.io/api/maps",
    
}

module.exports = {
    config
}


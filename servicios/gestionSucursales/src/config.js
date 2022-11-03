
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    SUCURSALES_PORT : process.env.SUCURSALES_PORT || 3000,
    PATH_JSON: "/../../sucursales.json",

    MAP_ID: "bb782eaf-5cd0-4895-bd42-423cb02ca4e8",
    MAP_BASEURL: "https://cartes.io/api/maps",
    
}

module.exports = {
    config
}


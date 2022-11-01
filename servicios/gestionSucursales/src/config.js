
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    SUCURSALES_PORT : process.env.SUCURSALES_PORT || 3000,
    PATH_JSON: "/../../sucursales.json",
}

module.exports = {
    config
}
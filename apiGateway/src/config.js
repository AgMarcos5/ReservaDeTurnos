
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    PORT : process.env.API_GATEWAY_PORT || 3000,
    RESERVAS_PORT : process.env.RESERVAS_PORT || 5000,
    SUCURSALES_PORT : process.env.SUCURSALES_PORT || 6000,
}

module.exports = {
    config
}
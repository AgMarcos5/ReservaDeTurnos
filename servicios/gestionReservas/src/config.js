
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    RESERVAS_PORT : process.env.RESERVAS_PORT || 5000,
    NOTIFICACIONES_PORT : process.env.NOTIFICACIONES_PORT || 7000,
    PATH_JSON: "/../../../reservas.json",
}

module.exports = {
    config
}
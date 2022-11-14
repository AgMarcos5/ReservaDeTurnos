
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    NOTIFICACIONES_PORT : process.env.NOTIFICACIONES_PORT || 7000,
    SENDGRID_API_KEY : process.env.SENDGRID_API_KEY,
    SENDGRID_URL : process.env.SENDGRID_URL,
    SENDGRID_PATH : process.env.SENDGRID_PATH,
    PATH_JSON : '/../bodyMail.json'
}

module.exports = {
    config
}
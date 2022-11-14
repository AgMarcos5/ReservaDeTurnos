
require('dotenv').config();

// Crear un archivo .env con las variables correspondientes

const config = {
    NOTIFICACIONES_PORT : process.env.NOTIFICACIONES_PORT || 7000,
    API_KEY : process.env.API_KEY,
    URL_SENDGRID : process.env.URL_SENDGRID,
    PATH_SENDGRID : process.env.PATH_SENDGRID,
    MAIL_STRUCT : process.env.MAIL_STRUCT
}

module.exports = {
    config
}
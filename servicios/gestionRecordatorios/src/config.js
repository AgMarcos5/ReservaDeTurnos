require('dotenv').config();

const config = {
    NOTIFICACIONES_PORT : process.env.NOTIFICACIONES_PORT || 7000,
    PATH_JSON : "/../../reservas.json",
    INTERVAL : 5000,  // Deberia ser 86.400.000 (cada 24hs)
}

module.exports = {
    config
}
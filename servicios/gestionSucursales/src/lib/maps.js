const fs = require('fs');
const path = require('path');
const { config } = require('../config');

const {PATH_JSON, MAP_ID, MAP_BASEURL} = config;

const initMaps = () => {
    try {
        const sucursales = JSON.parse(fs.readFileSync(path.join(__dirname + PATH_JSON)));

        // GET markers del mapa
        // eliminar los repetidos en sucursales y markers
        // petición DELETE de markers
        // petición POST de sucursales

    } catch (error) {
        console.log(error)
    }
      
}

module.exports = {
    initMaps,
}
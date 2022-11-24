const fs = require('fs');
const https = require('https')
const path = require('path');
const { config } = require('../config');

const {PATH_JSON, MAP_ID, MAP_BASEURL} = config;

const MapURL =`${MAP_BASEURL}/${MAP_ID}`;
const MarkURL = `${MAP_BASEURL}/${MAP_ID}/markers`;


const optionsPost = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}


const optionsGet = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}



const getMap = async () => {
    
    return new Promise((resolve,reject) => {
        const request = https.request(MapURL,optionsGet, function(response){
            let body = '';
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    request.body = JSON.parse(JSON.stringify(body));
                    //console.log(request.body);
                    resolve(request.body)
                })
                .on('error', err => {
                    reject();
                })
        });

        

        request.on('error', () => {
            reject("error al conectar");
        })

        request.end();
    })

}

const  postMarkers = async (marcador) => {

    return new Promise((resolve,reject) => {
        const request = https.request(MarkURL,optionsPost, function(response){
            let body = '';
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    request.body = JSON.parse(JSON.stringify(body));
                    //console.log(request.body);
                    resolve(request.body)
                })
                .on('error', err => {
                    reject();
                })
        });

        
    
        request.write(JSON.stringify(marcador));

        request.on('error', () => {
            reject("error al conectar");
        })

        request.end();
    })

}



const  getMarkers = async () => {

    return new Promise((resolve,reject) => {
        const request = https.request(MarkURL,optionsGet, function(response){
            let body = '';
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    request.body = JSON.parse(JSON.stringify(body));
                    //console.log(request.body);
                    resolve(request.body)
                })
                .on('error', err => {
                    reject();
                })
        });


        request.on('error', () => {
            reject("error al conectar");
        })

        request.end();
    })

}



const initMaps = async (req,res) => {
    try {
        
        //GET mapa
        const mapa = JSON.parse( await getMap() );
        //console.log(` ${JSON.stringify(mapa)}`);


        //GET markers del mapa

        const marksOnMap = JSON.parse( await getMarkers());
        //console.log(`Marcadores del mapa: ${(JSON.stringify(marksOnMap))}`);


         // POST markers del mapa

         const sucursales = JSON.parse(fs.readFileSync(path.join(__dirname + PATH_JSON)));

         await sucursales.forEach(async element => {
             let marcador = {
                 "lat": element['lat'],
                 "lng": element['lng'],
                 "description": `Marcador de la sucursal ${element['name']} con latitud: ${element['lat']} y con longitud ${element['lng']}`,
                 "category_name": element['name'] 
             }
             JSON.parse( await postMarkers(marcador) );
             });
 


    } catch (error) {
        console.log(error)
    }
      
}




module.exports = {
    initMaps,
}




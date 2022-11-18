const fs = require('fs');
const https = require('https')
const path = require('path');
const { config } = require('../config');

const {PATH_JSON, MAP_ID, MAP_BASEURL} = config;


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

const optionsDelete = {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}



const  postMarkers = async (marcador) => {

    return new Promise((resolve,reject) => {
        const request = https.request(`https://cartes.io/api/maps/f9e7d70b-5d27-4158-b15d-5c472dd52768/markers`,optionsPost, function(response){
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
        const request = https.request(`https://cartes.io/api/maps/f9e7d70b-5d27-4158-b15d-5c472dd52768/markers`,optionsGet, function(response){
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

const  deleteMarkes = async (aux) => {

    return new Promise((resolve,reject) => {
        const request = https.request(`https://cartes.io/api/maps/f9e7d70b-5d27-4158-b15d-5c472dd52768/markers/4697`,optionsDelete, function(response){
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

        
    
       request.write(JSON.stringify(aux));

        request.on('error', () => {
            reject("error al conectar");
        })

        request.end();
    })

}

const initMaps = async (req,res) => {
    try {
        
    

        //GET markers del mapa

        const marksOnMap = JSON.parse( await getMarkers());
        //console.log(`Marcadores del mapa: ${marksOnMap}`);


         // POST markers del mapa
         const marcadores = [];

         const sucursales = JSON.parse(fs.readFileSync(path.join(__dirname + PATH_JSON)));
         await sucursales.forEach(async element => {
             let marcador = {
                 "lat": element['lat'],
                 "lng": element['lng'],
                 "description": `Marcador de la sucursal ${element['name']} con latitud: ${element['lat']} y con longitud${element['lng']}`,
                 "category_name": element['name'] 
             }
             marcadores.push(JSON.parse( await postMarkers(marcador) ) );
             });
 

        // petición DELETE de markers
        const aux =  {
            "id": "4", 
            "lat": "-38.012061",
            "lng": "17.5835651", 
            "category": "679"
        }
        //todavia no funciona
        const deleteMark = JSON.parse( await deleteMarkes(aux));
        //console.log(`Marcador del mapa eliminado: ${deleteMark}`);
        
        

    } catch (error) {
        console.log(error)
    }
      
}




module.exports = {
    initMaps,
}




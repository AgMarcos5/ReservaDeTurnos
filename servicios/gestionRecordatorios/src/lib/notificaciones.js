const http = require('http');


const POSTRequest = (options, body) => {
    return new Promise((resolve, reject) => {
        const request = http.request(options, function(response){
            let data = '';
            response
                .on('data', chunk => {
                    data += chunk;
                })
                .on('end', () => {
                    console.log("Response: sent");
                    resolve();
                })
                .on('error', err => {
                    reject();
                })
        });
        
        request.on('error', () => {
            reject("Error al conectar");
        })
        
        request.write(JSON.stringify(body));
        request.end();
    });
}

module.exports = {
    POSTRequest,
}
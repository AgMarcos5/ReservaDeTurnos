const http = require('http');


const sendMail = (options,mail) => {
    return new Promise((resolve,reject) => {
        const request = http.request(options, function(response){
            let body = '';
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', err => {
                    reject();
                })
        });
        
        request.write(JSON.stringify(mail));

        request.on('error', () => {
            reject("Error al conectar");
        })

        request.end();
    })
}

module.exports = {
    sendMail
}
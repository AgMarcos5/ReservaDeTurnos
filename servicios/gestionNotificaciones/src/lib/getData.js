const https = require('https')


const getData = (options,mail) => {
    return new Promise((resolve,reject) => {
        const request = https.request(options, function(response){
            let body = '';
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    request.body = JSON.parse(JSON.stringify(body));
                    resolve(request.body)
                })
                .on('error', err => {
                    reject();
                })
        });
        
        request.write(JSON.stringify(mail));

        request.on('error', () => {
            reject("error al conectar");
        })

        request.end();
    })
}

module.exports = {
    getData
}
const http = require('http')

const getData = ({hostname, port, path, method, body = null}) => {
    return new Promise((resolve,reject) => {
        const request = http.request(`http://${hostname}:${port}${path}`, {method}, function(response){
            let body = '';
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    request.body = JSON.parse(body);
                    resolve(request)
                })
                .on('error', err => {
                    reject();
                })
        });

        if( method === 'POST')
            request.write(JSON.stringify(body))
        else
        if( method === 'DELETE'){
            request.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(body)))
            request.write(JSON.stringify(body))
        }

        request.on('error', () => {
            reject("error al conectar");
        })

        request.end();
    })
}


module.exports = {
    getData,
}
const http = require('http')

function getData(port){
    return new Promise((resolve,reject) => {
        let body = '';
        const request = http.request(`http://localhost:${port}/`, {method: 'GET'}, function(response){
            response
                .on('data', chunk => {
                    body += chunk;
                })
                .on('end', () => {
                    request.body = JSON.parse(body);
                    resolve(request.body)
                })
        });
        request.end();
    })
}

module.exports = {
    getData,
}

function getData(port){
    let body = '';
    const request = http.request(`http://localhost:${port}/`, {method: 'GET'}, function(response){
        
        response
            .on('data', chunk => {
                body += chunk;
            })
            .on('end', () => {
                request.body = JSON.parse(body);
                console.log(request.body);
            })
    });
    request.end();
}

module.exports = {
    getData,
}
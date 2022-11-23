
const responseError = (response, message) => {
    response.writeHead(400, {'Content-Type': 'application/json'})
    response.write(JSON.stringify({
        msg: message
    }))
    response.end();
}

module.exports = {
    responseError
}
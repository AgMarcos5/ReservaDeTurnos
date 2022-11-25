const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Request-Method': '*',
    'Access-Control-Request-Headers': '*',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const responseError = (response, message) => {
    response.writeHead(400, { ...headers, "Content-Type": "application/json" })
    response.write(JSON.stringify({
        msg: message
    }))
    response.end();
}

module.exports = {
    responseError
}
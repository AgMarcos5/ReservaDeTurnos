const https = require('https')
const { responseError } = require("./error");
const { bodyParser } = require('./bodyParser')
const { config } = require("../config")

const { API_KEY,URL_SENDGRID,PATH_SENDGRID,MAIL_STRUCT } = config

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const options = {
    hostname: URL_SENDGRID,
    path: PATH_SENDGRID,
    method: 'POST',
    headers: {
        'Authorization': 'Bearer '+ API_KEY,
        "Content-Type": "application/json"
    }
}

const getData = (mail) => {
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

const buildMail = async (req) => {
    
    try{
        await bodyParser(req);
    
        const mail = MAIL_STRUCT;
        const mailJSON = JSON.parse(mail);

        mailJSON.personalizations.find(element => element.to).to.find(element => element.email = req.body.destinatario);
        mailJSON.subject = req.body.asunto;
        mailJSON.content.find(element => element.value = req.body.cuerpo);

        return mailJSON;
    }
    catch(error){
        responseError(res,error);
    }
}


const sendMail = async (req,res) => {
    try {
        const mail = await buildMail(req);
        const data = await getData(mail);
        
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
        console.log('Mail sent');
    } catch (error) {
        responseError(res,error)
    }
}

module.exports = {
    sendMail
}
const fs = require('fs');
const path = require('path');
const { responseError } = require("./error");
const { bodyParser } = require('./bodyParser');
const { getData } = require('./getData');
const { config } = require("../config");

const { SENDGRID_API_KEY,SENDGRID_URL,SENDGRID_PATH,PATH_JSON } = config

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Max-Age': 2592000, // 30 days
};

const options = {
    hostname: SENDGRID_URL,
    path: SENDGRID_PATH,
    method: 'POST',
    headers: {
        'Authorization': 'Bearer '+ SENDGRID_API_KEY,
        "Content-Type": "application/json"
    }
}

const buildMail = async (req) => {
    
    try{
        await bodyParser(req);
        
        let mailJSON = fs.readFileSync(path.join(__dirname + PATH_JSON));
        const mail = JSON.parse(mailJSON);
    
        mail.personalizations.find(element => element.to).to.find(element => element.email = req.body.destinatario);
        mail.subject = req.body.asunto;
        mail.content.find(element => element.value = req.body.cuerpo);

        return mail;
    }
    catch(error){
        responseError(res,'No se pudo construir el mail');
    }
}


const sendMail = async (req,res) => {
    try {
        const mail = await buildMail(req);
        const data = await getData(options,mail);
        
        res.writeHead(200, { ...headers, "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
        console.log('Mail sent');
    } catch (error) {
        responseError(res,'No se pudo envial el mail')
    }
}

module.exports = {
    sendMail
}
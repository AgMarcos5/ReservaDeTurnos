const express = require('express');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const { config } = require('./config');
const { getData } = require('./lib/getData');
const { responseError } = require('./lib/error')
const { bodyParser } = require('./lib/bodyParser');
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const checkJwt = auth({
  audience: 'tQeghMOCcruiyvJN5YyNqysMtBftWvkt',
  issuerBaseURL: `https://dev-rhxof712tnobs0d1.us.auth0.com`,
});
app.use(checkJwt);  

const { PORT,SUCURSALES_PORT,RESERVAS_PORT } = config;


const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, DELETE',
  'Access-Control-Request-Method': '*',
  'Access-Control-Request-Headers': '*',
  'Access-Control-Max-Age': 2592000, // 30 days
};

const optionsReservas = {
  hostname: 'localhost',
  port: RESERVAS_PORT,
}

const optionsSucursales = {
  hostname: 'localhost',
  port: SUCURSALES_PORT,
}


// ALTA RESERVA
app.post('/api/reservas/confirmar/:ID', checkJwt, async (req, res) => {
  
  try {
    await bodyParser(req)
    const data = await getData({
        ...req,
        ...optionsReservas, 
        path: `/api/reservas/confirmar/${req.params.ID}`, 
        method: "POST", 
    });
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
} catch (error) {
    responseError(res,error)
}
});


// VERIFICACION TURNO
app.post('/api/reservas/solicitar/:ID', checkJwt, async (req, res) => {

  try {
    await bodyParser(req)
    const data = await getData({
        ...req,
        ...optionsReservas, 
        path: `/api/reservas/solicitar/${req.params.ID}`, 
        method: "POST", 
    });
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
  }
  catch (error) {
    responseError(res,error)
  }
});


// BAJA RESERVA
app.delete('/api/reservas/:ID', checkJwt, async (req, res) => {

  try {
    await bodyParser(req)
    const data = await getData({
        ...req,
        ...optionsReservas, 
        path: `/api/reservas/${req.params.ID}`, 
        method: "DELETE",
    });
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
  } 
  catch (error) {
    responseError(res,error)
  }

});


// GET RESERVAS (con query params)
app.get('/api/reservas', checkJwt, async (req, res) => {

  try {
    const qp = Object.keys(req.query).length ? `?${req.url.split('?')[1]}` : '';
    
    const data = await getData({
        ...req,
        ...optionsReservas, 
        path: `/api/reservas${qp}`, 
        method: "GET"
    });

    console.log(`/api/reservas${qp}`)
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
  } 
  catch (error) {
    responseError(res,error)
  }
})


// GET RESERVA (ID)
app.get('/api/reservas/:ID', checkJwt, async (req, res) => {

  try {
    const data = await getData({
        ...req,
        ...optionsReservas, 
        path: `/api/reservas/${req.params.ID}`, 
        method: "GET",
    });
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
  }
  catch (error) {
      responseError(res,error)
  }
})


// GET SUCURSALES
app.get('/api/sucursales', checkJwt, async (req, res) => {

  try {
    const data = await getData({
        ...req,
        ...optionsSucursales, 
        path: '/api/sucursales', 
        method: "GET"
    });
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
  } 
  catch (error) {
    responseError(res,error);
  }
})


// GET SUCURSAL (ID)
app.get('/api/sucursales/:branchId', checkJwt, async (req, res) => {

  try {
    const data = await getData({
        ...req,
        ...optionsSucursales, 
        path: `/api/sucursales/${req.params.branchId}`, 
        method: "GET"
    });
    
    const statusCode = data.res.statusCode;
    res.writeHead(statusCode, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(data.body));
    res.end();
  } 
  catch (error) {
    responseError(res,error);
  }
})


app.listen(PORT, () => {
    console.log(`API Express en el puerto ${PORT}`)
})
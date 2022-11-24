const express = require('express')
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const app = express()
const port = 4000



const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

/*
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-rhxof712tnobs0d1.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'sdturnos',
  issuer: 'https://dev-rhxof712tnobs0d1.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});
*/



  // Authorization middleware. When used, the Access Token must
  // exist and be verified against the Auth0 JSON Web Key Set.
  const checkJwt = auth({
    audience: 'sdturnos',
    issuerBaseURL: `https://dev-rhxof712tnobs0d1.us.auth0.com/`,
  });
  
  // This route doesn't need authentication
  app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  
  // This route needs authentication
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });
  
  const checkScopes = requiredScopes('read:messages');
  
  app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
    });
  });
  







// ALTA RESERVA
app.post('/api/reservas/confirmar/:ID', (req, res) => {
    res.send('Confirmar reserva');
});

// VERIFICACION TURNO
app.post('/api/reservas/solicitar/:ID', (req, res) => {
    res.send('Solicitar reserva');
});

// BAJA RESERVA
app.delete('/api/reservas/:ID', (req, res) => {
    res.send('Borrar reserva');
});

// GET RESERVAS (con query params)
app.get('/api/reservas', (req, res) => {
  res.send('reservas')
})


// GET RESERVA (ID)
app.get('/api/reservas/:ID', (req, res) => {
    res.send('reservas')
})


// GET SUCURSALES
app.get('/api/sucursales', (req, res) => {
    res.send('reservas')
})


// GET SUCURSAL (ID)
app.get('/api/sucursales/:branchId', (req, res) => {
    res.send('sucursal')
})




app.listen(port, () => {
    console.log(`API Express en el puerto ${port}`)
})
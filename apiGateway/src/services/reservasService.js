const { bodyParser } = require("../lib/bodyParser");
const { getData } = require("../lib/getData");

// BORRAR
const reservas = [
    {
        "id": "1",
        "datetime": "2022-09-02T10:58:10.406Z",
        "userId": "2", 
        "email": "email@gmail.com", 
        "branchId": "3" 
    },
    {
        "id": "2",
        "datetime": "2022-09-02T12:58:10.406Z",
        "userId": null, 
        "email": null, 
        "branchId": "1" 
    },
    {
        "id": "3",
        "datetime": "2022-09-02T14:58:10.406Z",
        "userId": "2", 
        "email": "email@gmail.com", 
        "branchId": "3" 
    },
    {
        "id": "4",
        "datetime": "2022-09-02T16:58:10.406Z",
        "userId": null, 
        "email": null, 
        "branchId": "2" 
    },
    {
        "id": "5",
        "datetime": "2022-09-02T18:58:10.406Z",
        "userId": null, 
        "email": null, 
        "branchId": "2" 
    },
    {
        "id": "6",
        "datetime": "2022-09-02T14:58:10.406Z",
        "userId": null, 
        "email": null, 
        "branchId": "3" 
    },
]
    

const getReservas = async () => {
    /*
    ACÁ HAY QUE OBTENER TODAS LAS RESERVAS 
    HACIENDO UNA PETICIÓN HTTP AL MICROSERVICIO DE 
    GESTION RESERVAS
    */
   try {
    const data = await getData(5000);
    console.log("getReservas",data)
    return data;
   } catch (error) {
    console.log(error)
   }
}

const getReservasUsuario = () => {

    return []
}

const altaReserva = () => {

}

const bajaReserva = () => {

}

module.exports = {
    getReservas,
    getReservasUsuario,
    altaReserva,
    bajaReserva,
}
import { navigate } from "../routes/routes.js"
import {config} from '../config.js'

let authStatus = 'not-authenticated' // checking // authenticated 

const getUserId = () => {
    if(authStatus === 'authenticated')
    {
        return 1
    } else{
        return 0;
    }
}

const getPort = () => {
    if(authStatus === 'authenticated')
    {
        return config.APIGATEWAY_AUTH_PORT
    } else{
        return config.APIGATEWAY_PORT;
    }
}

const checkAuth = () => {
    switch (authStatus) {
        case 'not-authenticated':
            navigate("/invitado");
            break;
    
        case 'authenticated':
            navigate("/inicio");
            break;
        
        default:
            navigate("/");
            break;
    }
}

const register = () => {
    authStatus = "authenticated";
    checkAuth();
}

const login = () => {
    authStatus = "authenticated";
    checkAuth();
}

const loginGuest = () => {
    authStatus = "not-authenticated";
    checkAuth();
}

const logout = () => {
    console.log("LOG OUT")
    authStatus = 'not-authenticated'
    checkAuth();
}

checkAuth();


window.logout = logout;

export  {
    getUserId,
    getPort
}

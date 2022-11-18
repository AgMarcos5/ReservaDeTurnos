import { navigate } from "../routes/routes.js"

let authStatus = 'not-authenticated' // checking // authenticated 

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

    if(authStatus === 'not-authenticated'){
        navigate("/invitado")
    }
    else{
        navigate("/inicio")
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

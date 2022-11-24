//import { navigate } from "../routes/routes.js"
//import {config} from '../config.js'

let authStatus = 'not-authenticated' // checking // authenticated 

////////////////////////////////////

let auth0Client = null;

const configureClient = async () => {
    auth0Client = await auth0.createAuth0Client({
      domain: "dev-rhxof712tnobs0d1.us.auth0.com",
      clientId: "ouMwjo792KemjsXFubFCeLf86b9jpQXc",
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
};

const login = async (targetUrl) => {
    try {
      console.log("Logging in", targetUrl);
  
      const options = {
        authorizationParams: {
          redirect_uri: window.location.origin
        }
      };
  
      if (targetUrl) {
        options.appState = { targetUrl };
      }
  
      await auth0Client.loginWithRedirect(options);
    } catch (err) {
      console.log("Log in failed", err);
    }
};

const logout = async () => {
    try {
      console.log("Logging out");
      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } catch (err) {
      console.log("Log out failed", err);
    }
};


/**
 * Verifica si el usuario está autenticado. Si es así, se ejecuta fn.
 * De lo contrario le pide al usuario que se autentique
 */
 const requireAuth = async (fn, targetUrl) => {
    const isAuthenticated = await auth0Client.isAuthenticated();
  
    if (isAuthenticated) {
      return fn();
    }
  
    return login(targetUrl);
};


window.onload = async () => {

    await configureClient();

    // If unable to parse the history hash, default to the root URL
    if (!showContentFromUrl(window.location.pathname)) {
      showContentFromUrl("/");
      window.history.replaceState({ url: "/" }, {}, "/");
    }

    const bodyElement = document.getElementsByTagName("body")[0];

    // Listen out for clicks on any hyperlink that navigates to a #/ URL
    bodyElement.addEventListener("click", (e) => {
      if (isRouteLink(e.target)) {
        const url = e.target.getAttribute("href");

        if (showContentFromUrl(url)) {
          e.preventDefault();
          window.history.pushState({ url }, {}, url);
        }
      }
    });
    //
    
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      console.log("> User is authenticated");
      window.history.replaceState({}, document.title, window.location.pathname);
      updateUI();
      return;
    }

    console.log("> User not authenticated");

    const query = window.location.search;
    const shouldParseResult = query.includes("code=") && query.includes("state=");

    if (shouldParseResult) {
        console.log("> Parsing redirect");
        try {
          const result = await auth0Client.handleRedirectCallback();
          if (result.appState && result.appState.targetUrl) {
            showContentFromUrl(result.appState.targetUrl);
          }
          console.log("Logged in!");
        } catch (err) {
          console.log("Error parsing redirect:", err);
        }
    
        window.history.replaceState({}, document.title, "/");
    }

    updateUI();

}

/*
const updateUI = async () => {
    try {
      const isAuthenticated = await auth0Client.isAuthenticated();
  
      if (isAuthenticated) {
        const user = await auth0Client.getUser();
        console.log(user)

        const username = document.getElementById('username');
        username.innerText = user.given_name;

        // Oculta elementos para los usuarios no autenticados
        const authList = document.querySelectorAll('.auth');
        for (var item of authList) {
          item.classList.remove("hide");
        }


      } else {

        // Oculta elementos para los usuarios autenticados
        const authList = document.querySelectorAll('.not-auth');
        for (var item of authList) {
          item.classList.remove("hide");
        }

      }
    } catch (err) {
      console.log("Error updating UI!", err);
      return;
    }
    console.log("UI updated");
  };
*/
////////////////////////////////////


async function testEndpoint() {
  try {
    const response = await fetch("http://localhost:4000/api/auth/private", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Request-Headers": "no-cors",
        "Access-Control-Allow-Origin": "no-cors",
      },
    });
    if (response.status === 200) {
      alert("OK");
    } else {
      alert(`Error: ${response.status}`);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}


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

/*
const checkAuth = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();

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
*/


// EVENTOS

window.login = login;
window.logout = logout;

/*
export  {
    getUserId,
    getPort
}
*/
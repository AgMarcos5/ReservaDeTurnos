let auth0Client = null;
let config = null

const fetchConfig = () => fetch("../config.json");

const configureClient = async () => {
    const response = await fetchConfig();
    config = await response.json();

    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
      //domain: "dev-rhxof712tnobs0d1.us.auth0.com",
      //clientId: "ouMwjo792KemjsXFubFCeLf86b9jpQXc",
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
};

const login = async (targetUrl) => {
    try {  
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
      console.log("Login error", err);
    }
};

const logout = async () => {
    try {
      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } catch (err) {
      console.log("Logout error", err);
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

    if (!showContentFromUrl(window.location.pathname)) {
      showContentFromUrl("/");
      window.history.replaceState({ url: "/" }, {}, "/");
    }

    const bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.addEventListener("click", (e) => {
      if (isRouteLink(e.target)) {
        const url = e.target.getAttribute("href");

        if (showContentFromUrl(url)) {
          e.preventDefault();
          window.history.pushState({ url }, {}, url);
        }
      }
    });
    
    const isAuthenticated = await auth0Client.isAuthenticated();
    getConfig();
    if (isAuthenticated) {
      console.log("> Usuario autenticado");
      //sessionStorage.setItem('PORT', config.APIGATEWAY_AUTH_PORT);

      window.history.replaceState({}, document.title, window.location.pathname);
      updateUI();
      return;
    }

    console.log("> Usuario no autenticado");
    //sessionStorage.setItem('PORT', config.APIGATEWAY_PORT);

    const query = window.location.search;
    const shouldParseResult = query.includes("code=") && query.includes("state=");

    if (shouldParseResult) {
        try {
          const result = await auth0Client.handleRedirectCallback();
          if (result.appState && result.appState.targetUrl) {
            showContentFromUrl(result.appState.targetUrl);
          }
        } catch (err) {
          console.log("Error parsing redirect:", err);
        }
        window.history.replaceState({}, document.title, "/");
    }

    updateUI();

}


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

const getConfig = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  if(isAuthenticated){
    const user = await auth0Client.getUser();
    const userId = hashCode(user.email)
    sessionStorage.setItem('PORT', config.APIGATEWAY_AUTH_PORT);
    sessionStorage.setItem('USERID', userId);
    return {
      PORT: config.APIGATEWAY_AUTH_PORT,
      USERID: userId
    }
  } else{
    sessionStorage.setItem('PORT', config.APIGATEWAY_PORT);
    sessionStorage.setItem('USERID', 0);
    return {
      PORT: config.APIGATEWAY_PORT,
      USERID: 0
    } 
  }
}




// EVENTOS
window.login = login;
window.logout = logout;
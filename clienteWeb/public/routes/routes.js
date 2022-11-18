
export const navigate = (url) => {
    window.history.pushState({}, "", url);
    handleLocation();
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}


const routes = {
    404: "/pages/404.html",
    "/" : "/pages/checkAuth.html",
    
    "/invitado": "/pages/guest/index.html",
    "/inicio" : "/pages/user/index.html",
    "/reservas" : "/pages/user/reservas.html",

    "/login": "/pages/login.html",
    "/register": "/pages/register.html",
}


const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then( data => data.text());
    document.getElementById("main-page").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();


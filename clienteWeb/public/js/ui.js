const showContentFromUrl = (url) => {
  if (router[url]) {
    router[url]();
    return true;
  }
  return false;
};

const eachElement = (selector, fn) => {
    for (let e of document.querySelectorAll(selector)) {
        fn(e);
    }
};

const isRouteLink = (element) =>  element.tagName === "A" && element.classList.contains("route-link");

const showContent = async (id) => {
    eachElement(".page", (p) => p.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
};


const updateUI = async () => {
   try {
     const isAuthenticated = await auth0Client.isAuthenticated();
      
     const config = await getConfig();

     if (isAuthenticated) {
       const user = await auth0Client.getUser();

       const username = document.getElementById("username");
       username.innerText = user.given_name;

       const email = document.querySelector('#reservaForm input');
       email.value = user.email;
       email.disabled = true;


       // Muestra elementos para los usuarios autenticados
       const authList = document.querySelectorAll(".auth");
       for (var item of authList) {
         item.classList.remove("hide");
       }
     } else {
       // Muestra elementos para los usuarios no autenticados
       const authList = document.querySelectorAll(".not-auth");
       for (var item of authList) {
         item.classList.remove("hide");
       }
     }
   } catch (err) {
     console.log("Error updating UI!", err);
     return;
   }
};


window.onpopstate = (e) => {
  if (e.state && e.state.url && router[e.state.url]) {
    showContentFromUrl(e.state.url);
  }
};

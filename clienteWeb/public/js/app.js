import { initReservas } from "./reservas.js";
import { initSucursales } from "./sucursales.js";
import { initTurnos, searchTurnos, turnos } from "./turnos.js";

let header = {
  Accept: "application/json",
};

const init = async () => {
  const port = sessionStorage.getItem("PORT") || 3000;
  const userId = sessionStorage.getItem("USERID") || 0;
  const token = sessionStorage.getItem("TOKEN") || null;

  //console.log("PORT",port,"USERID",userId,"TOKEN",token)

  if (token) {
    header["Authorization"] = "Bearer " + token;
  }

  await initSucursales(port, header);
  await initTurnos(port, header);
  await initReservas(port, userId, header);
};

setTimeout(() => {
  init()
},1000)


// LOGIN Y LOGOUT

loginButton.addEventListener("click", () => {
  console.log("login");
  login();
  //init();
});

logoutButton.addEventListener("click", () => {
  console.log("logout");
  logout();
  //init();
});

////////////////////

// LOGOUT BUTTON
const usernameDropdown = document.querySelector(".username-menu");
const optionUsername = document.getElementById("username");

document.addEventListener("click", (event) => {
  const isClickInsideUsername =
    usernameDropdown.contains(event.target) ||
    optionUsername.contains(event.target);

  if (!isClickInsideUsername) {
    hide(usernameDropdown);
  }
});

username.addEventListener("click", () => {
  toggle(usernameDropdown);
});

// BUSQUEDA
const searchButton = document.querySelector(".options .searchWrapper .btn");

searchButton.addEventListener("click", async () => {
  const inputSucursal = document.querySelector(
    ".options #option-sucursal input"
  ).id;
  const inputDate = document.querySelector(".options #option-date input").value;

  let queryParams = {
    branchId: inputSucursal,
    dateTime: inputDate,
  };
  
  const config = await getConfig();
  const PORT = config.PORT;

  searchTurnos(PORT, buildQuery(queryParams), header);
});

// FORMULARIO RESERVA DE TURNOS
reservaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  solicitarTurno();
  initTurnos();
});

const solicitarTurno = async () => {
  // FORM turnos
  const turnoHtml = document.querySelector(".turnosContainer .turno.selected");
  const form = document.getElementById("reservaForm");
  const email = form.elements["email"].value;

  if (turnoHtml) {
    const idReserva = turnoHtml.id;
    const listaTurnos = await turnos;
    const turnoSeleccionado = listaTurnos.find(t => t.idReserva == idReserva);

    if (turnoSeleccionado.status == 0 && email) {
      // turno libre
      try {
        const config = await getConfig();
        const PORT = config.PORT;
        const USERID = config.USERID;

        const rawResponse = await fetch(
          `http://localhost:${PORT}/api/reservas/solicitar/${idReserva}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify({ userId: USERID }),
          }
        );

        const content = await rawResponse.json();

        if (rawResponse.status === 200) {
          // Confirmar reserva
          Swal.fire({
            title: "Confirmar la reserva?",
            icon: "question",
            confirmButtonText: "Confirmar",
          }).then(({ isConfirmed }) => {
            if (isConfirmed) {
              reservarTurno(PORT, idReserva, USERID, email);
            }
          });
        } else if (rawResponse.status === 400) {
          Swal.fire({
            title: "Error",
            text: content.msg,
            icon: "error",
            confirmButtonText: "Confirmar",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo conectar con el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  }
};

const reservarTurno = async (port, idReserva, userId, email) => {
  const rawResponse = await fetch(
    `http://localhost:${port}/api/reservas/confirmar/${idReserva}`,
    {
      method: "POST",
      headers:header,
      body: JSON.stringify({ userId, email }),
    }
  );

  const content = await rawResponse.json();

  if (rawResponse.status === 200) {
    Swal.fire({
      title: "Reserva confirmada",
      icon: "success",
      confirmButtonText: "cerrar",
    });

    if(userId != 0)
      await initReservas(port, userId, header);

  } else if (rawResponse.status === 400) {
    Swal.fire({
      title: "Error al confirmar",
      text: content.msg,
      icon: "error",
      confirmButtonText: "cerrar",
    });
  }

  
  await initTurnos(port, header);
};

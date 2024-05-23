const shopContent = document.getElementById("shopContent");

const verCarrito = document.getElementById("ver-carrito");

const modalcontainer = document.getElementById("modal-section");

const cantidadcarrito = document.getElementById("cantidadcarrito");

var carrito = [];

servicios.forEach((servicios) => {
    let content = document.createElement("div");
    content.className = "card todoslosservicios";
    content.innerHTML = `
        <img src="${servicios.imagen}">
        <h3 class="tituloservicio">${servicios.titulo}</h3>
        <p>$${servicios.precio}</p>
        <p>${servicios.descripcion}</p>
    `;
    shopContent.append(content);

    //    <button id="botonreservar" class="botonreservar">Reservar</button>

    let botonreservar = document.createElement("button");
    botonreservar.innerHTML = "Reservar";
    botonreservar.className = "botonreservar";

    content.append(botonreservar);

    botonreservar.addEventListener("click", () => {

        const repeat = carrito.some((serviciosrepetido) => serviciosrepetido.id === servicios.id);

        console.log(repeat)

        if (repeat) {
            carrito.map((servicio) => {
                if (servicio.id === servicios.id) {
                    servicio.cantidad++;
                }
            })
        }
        else {
            carrito.push({
                id: servicios.id,
                titulo: servicios.titulo,
                imagen: servicios.imagen,
                precio: servicios.precio,
                descripcion: servicios.descripcion,
                cantidad: servicios.cantidad

            });
        }
        carritocounter();
        pintarcarrito();

    });
});


document.addEventListener("keyup", (e) => {
    if (e.target.matches("#buscador")) {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll(".tituloservicio").forEach((servicio) => {
            const contieneTexto = servicio.textContent.toLowerCase().includes(searchTerm);
            const divServicio = servicio.closest(".todoslosservicios");
            if (divServicio) {
                if (contieneTexto) {
                    divServicio.classList.remove("filtro");
                } else {
                    divServicio.classList.add("filtro");
                }
            }
        });
    }
});



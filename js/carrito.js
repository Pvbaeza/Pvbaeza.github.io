const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("ver-carrito");
const modalcontainer = document.getElementById("modal-section");
const cantidadcarrito = document.getElementById("cantidadcarrito");

var carrito = [];

servicios.forEach((servicio) => {
    let content = document.createElement("div");
    content.className = "card todoslosservicios";
    content.innerHTML = `
        <img src="${servicio.imagen}">
        <h3 class="tituloservicio">${servicio.titulo}</h3>
        <p>$${servicio.precio}</p>
        <p>${servicio.descripcion}</p>
    `;
    shopContent.append(content);

    let botonreservar = document.createElement("button");
    botonreservar.innerHTML = "Reservar";
    botonreservar.className = "botonreservar";
    content.append(botonreservar);

    botonreservar.addEventListener("click", () => {
        const repeat = carrito.some((serviciosrepetido) => serviciosrepetido.id === servicio.id);

        if (repeat) {
            carrito.map((serv) => {
                if (serv.id === servicio.id) {
                    serv.cantidad++;
                }
            });
        } else {
            carrito.push({ ...servicio, cantidad: 1 });
        }
        carritocounter();

        // Verificar si el carrito está visible y actualizarlo en tiempo real
        if (modalcontainer.style.display === "flex") {
            pintarcarrito();
        }
    });
});

const pintarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-titulo">Tus servicios</h1>`;
    modalcontainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = "🛒";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    });
    modalHeader.append(modalbutton);

    carrito.forEach((servicio) => {
        let contenidocarrito = document.createElement("div");
        contenidocarrito.className = "modal-content";
        contenidocarrito.innerHTML = `
            <img class="img-carrito" src="${servicio.imagen}">
            <div class="servicios-carrito">
                <h3>${servicio.titulo}</h3>
                <p>Cantidad: ${servicio.cantidad}</p>
                <p>Total: $${servicio.cantidad * servicio.precio}</p>
            </div>
        `;
        modalcontainer.append(contenidocarrito);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        eliminar.style.marginLeft = "auto";
        contenidocarrito.append(eliminar);

        eliminar.addEventListener("click", () => eliminarservicio(servicio.id));
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalcompra = document.createElement("div");
    totalcompra.className = "total-content";
    totalcompra.innerHTML = `Total: $${total} <button class="botonpagar">Reservar</button>`;
    modalcontainer.append(totalcompra);
};

const eliminarservicio = (id) => {
    carrito = carrito.filter((servicio) => servicio.id !== id);
    carritocounter();
    pintarcarrito();
};

const carritocounter = () => {
    cantidadcarrito.style.display = "block";
    // Calcular la cantidad total de servicios en el carrito
    const totalCantidad = carrito.reduce((acc, servicio) => acc + servicio.cantidad, 0);
    cantidadcarrito.innerText = totalCantidad;
};

verCarrito.addEventListener("click", pintarcarrito);

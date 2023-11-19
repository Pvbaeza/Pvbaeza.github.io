const pintarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-titulo">Tus servicios</h1>  
    `;
    modalcontainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = "🛒";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    })

    modalHeader.append(modalbutton);


    carrito.forEach((servicio) => {
        let contenidocarrito = document.createElement("div");
        contenidocarrito.className = "modal-content";
        contenidocarrito.innerHTML = `
        <img class="img-carrito" src="${servicio.imagen}">
        <div class="servicios-carrito">
        <h3>${servicio.titulo}</h3>
        <p>Cantidad: ${servicio.cantidad}<p>
        <p>Total:$ ${servicio.cantidad * servicio.precio}<p>
        </div>
        `;

        modalcontainer.append(contenidocarrito);

        console.log(carrito.length)

        let eliminar = document.createElement("span");

        eliminar.innerText="❌";
        eliminar.className="delete-product";
        eliminar.style.marginLeft = "auto";
        contenidocarrito.append(eliminar);

        eliminar.addEventListener("click",eliminarservicio)
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalcompra = document.createElement("div");
    totalcompra.className = "total-content";
    totalcompra.innerHTML = `Total: $${total} 
    <button class="botonpagar">Reservar</button>`;
    modalcontainer.append(totalcompra);
};

verCarrito.addEventListener("click", pintarcarrito) ;

const eliminarservicio = () => {
    //filtro el id del servicio a eliminar
    const foundId =carrito.find((element)=> element.id);

    carrito = carrito.filter((carritoId)=>{
        return carritoId !==foundId;
    });
    carritocounter();
    pintarcarrito();
};


const carritocounter=()=>{
    cantidadcarrito.style.display="block";
    cantidadcarrito.innerText=carrito.length;
};
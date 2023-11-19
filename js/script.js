const shopContent = document.getElementById("shopContent");

const verCarrito = document.getElementById("ver-carrito");

const modalcontainer = document.getElementById("modal-section")

var carrito=[];  
  
servicios.forEach((servicios)=>{
    let content = document.createElement("div");
    content.className = "card todoslosservicios";
    content.innerHTML=`
        <img src="${servicios.imagen}">
        <h3 class="tituloservicio">${servicios.titulo}</h3>
        <p>${servicios.descripcion}</p>
    `;
    shopContent.append(content);

//    <button id="botonreservar" class="botonreservar">Reservar</button>

    let botonreservar = document.createElement("button");
    botonreservar.innerHTML="Reservar";
    botonreservar.className="botonreservar";

    content.append(botonreservar);

    botonreservar.addEventListener("click",() =>{

        carrito.push({
            id: servicios.id,
            titulo: servicios.titulo,
            imagen: servicios.imagen,
            precio: servicios.precio,
            descripcion: servicios.descripcion
        });
        console.log(carrito)
    });
});


document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        const searchTerm = e.target.value.toLowerCase();

        document.querySelectorAll(".tituloservicio").forEach(servicio => {
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

verCarrito.addEventListener("click",()=>{
    modalcontainer.innerHTML="";
    modalcontainer.style.display="flex";

    const modalHeader = document.createElement("div");
    modalHeader.className="modal-header";
    modalHeader.innerHTML=`
    <h1 class="modal-header-titulo">Tus servicios</h1>  
    `;
    modalcontainer.append(modalHeader);

    const modalbutton=document.createElement("h1");
    modalbutton.innerHTML="🛒";
    modalbutton.className="modal-header-button";

    modalbutton.addEventListener("click",()=>{
        modalcontainer.style.display="none";
    })

    modalHeader.append(modalbutton);


    carrito.forEach((servicio)=>{
        let contenidocarrito = document.createElement("div");
        contenidocarrito.className="modal-content";
        contenidocarrito.innerHTML=`
        <img class="img-carrito" src="${servicio.imagen}">
        <div class="servicios-carrito">
        <h3>${servicio.titulo}</h3>
        <p>${servicio.precio}</p>
        </div>
        `;

        modalcontainer.append(contenidocarrito);

    })

    const total=carrito.reduce((acc,el)=> acc + el.precio,0);
   
    const totalcompra = document.createElement("div");
    totalcompra.className="total-content";
    totalcompra.innerHTML=`Total: $${total} 
    <button class="botonpagar">Reservar</button>`;
    modalcontainer.append(totalcompra);
});
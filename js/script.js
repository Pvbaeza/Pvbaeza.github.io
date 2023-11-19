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

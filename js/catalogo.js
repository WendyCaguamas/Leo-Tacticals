const contenedorProductos =
    document.getElementById("productos-container");

function mostrarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";


    listaProductos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto-catalogo");


        tarjeta.innerHTML = `

            <div class="producto-imagenes">

                <img
                    src="${producto.imagenes[0]}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                >

<button
    class="flecha flecha-izquierda"
    onclick="cambiarImagen(this, -1)"
>
    <i class="fa-solid fa-chevron-left"></i>
</button>

<button
    class="flecha flecha-derecha"
    onclick="cambiarImagen(this, 1)"
>
    <i class="fa-solid fa-chevron-right"></i>
</button>



                <div
                    class="imagenes-producto-data"
                    data-imagenes='${JSON.stringify(producto.imagenes)}'
                >
                </div>

            </div>


            <div class="producto-datos">

                <h2>
                    ${producto.nombre}
                </h2>


                <p>
                    ${producto.detalles}
                </p>


                <div class="producto-precio">
                    $${producto.precio.toFixed(2)}
                </div>

            </div>

        `;


        contenedorProductos.appendChild(tarjeta);

    });

}

function cambiarImagen(boton, direccion) {

    const contenedor =
        boton.closest(".producto-imagenes");


    const imagen =
        contenedor.querySelector(".imagen-producto");


    const datos =
        contenedor.querySelector(".imagenes-producto-data");


    const imagenes =
        JSON.parse(datos.dataset.imagenes);


    let indice =
        parseInt(imagen.dataset.indice || "0");


    // Evitar múltiples animaciones al mismo tiempo
    if (imagen.dataset.animando === "true") {
        return;
    }


    imagen.dataset.animando = "true";


    // Calcular siguiente imagen
    indice += direccion;


    if (indice < 0) {
        indice = imagenes.length - 1;
    }


    if (indice >= imagenes.length) {
        indice = 0;
    }


    /*
       DIRECCIÓN DE LA ANIMACIÓN

       Siguiente:
       la imagen sale hacia la izquierda.

       Anterior:
       la imagen sale hacia la derecha.
    */

    const salida =
        direccion === 1
            ? "-100%"
            : "100%";


    const entrada =
        direccion === 1
            ? "100%"
            : "-100%";


    // Animar imagen actual hacia afuera
    imagen.style.transform =
        `translateX(${salida})`;


    setTimeout(() => {

        // Cambiar imagen
        imagen.src =
            imagenes[indice];


        imagen.dataset.indice =
            indice;


        /*
           Colocamos instantáneamente
           la nueva imagen al otro lado.
        */

        imagen.style.transition =
            "none";

        imagen.style.transform =
            `translateX(${entrada})`;


        /*
           Forzamos al navegador a reconocer
           la nueva posición antes de animarla.
        */

        imagen.offsetHeight;


        // Activar nuevamente la transición
        imagen.style.transition =
            "transform 0.35s ease";


        // Llevar la nueva imagen al centro
        imagen.style.transform =
            "translateX(0)";


    }, 350);


    setTimeout(() => {

        imagen.dataset.animando =
            "false";

    }, 700);

}

mostrarProductos(productos);

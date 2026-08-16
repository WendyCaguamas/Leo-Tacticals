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

    const imagenActual =
        contenedor.querySelector(".imagen-producto");

    const datos =
        contenedor.querySelector(".imagenes-producto-data");

    const imagenes =
        JSON.parse(datos.dataset.imagenes);


    // Evitar hacer otra transición mientras
    // la anterior todavía está funcionando.

    if (contenedor.dataset.animando === "true") {
        return;
    }

    contenedor.dataset.animando = "true";


    // Índice actual

    let indice =
        parseInt(imagenActual.dataset.indice || "0");


    // Calcular siguiente índice

    let nuevoIndice =
        indice + direccion;


    if (nuevoIndice < 0) {
        nuevoIndice = imagenes.length - 1;
    }


    if (nuevoIndice >= imagenes.length) {
        nuevoIndice = 0;
    }


    // Crear la segunda imagen

    const imagenNueva =
        document.createElement("img");


    imagenNueva.src =
        imagenes[nuevoIndice];

    imagenNueva.alt =
        imagenActual.alt;

    imagenNueva.classList.add("imagen-producto");


    // Posición inicial de la nueva imagen

    if (direccion === 1) {

        // Siguiente → entra desde la derecha

        imagenNueva.style.transform =
            "translateX(100%)";

    } else {

        // Anterior → entra desde la izquierda

        imagenNueva.style.transform =
            "translateX(-100%)";

    }


    // La nueva imagen se coloca encima

    contenedor.appendChild(imagenNueva);


    // Forzar al navegador a reconocer
    // la posición inicial

    imagenNueva.offsetWidth;


    // Mover ambas imágenes

    requestAnimationFrame(() => {

        if (direccion === 1) {

            // Imagen actual sale a la izquierda

            imagenActual.style.transform =
                "translateX(-100%)";

        } else {

            // Imagen actual sale a la derecha

            imagenActual.style.transform =
                "translateX(100%)";
        }


        // Imagen nueva entra al centro

        imagenNueva.style.transform =
            "translateX(0)";

    });


    // Cuando termina la animación

    setTimeout(() => {

        imagenNueva.dataset.indice =
            nuevoIndice;


        // Eliminar la imagen anterior

        imagenActual.remove();


        contenedor.dataset.animando =
            "false";

    }, 350);

}

mostrarProductos(productos);

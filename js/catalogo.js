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
                    class="flecha flecha-arriba"
                    onclick="cambiarImagen(this, -1)"
                >
                    <i class="fa-solid fa-chevron-up"></i>
                </button>


                <button
                    class="flecha flecha-abajo"
                    onclick="cambiarImagen(this, 1)"
                >
                    <i class="fa-solid fa-chevron-down"></i>
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


    indice += direccion;


    if (indice < 0) {

        indice = imagenes.length - 1;

    }


    if (indice >= imagenes.length) {

        indice = 0;

    }


    imagen.src =
        imagenes[indice];


    imagen.dataset.indice =
        indice;

}


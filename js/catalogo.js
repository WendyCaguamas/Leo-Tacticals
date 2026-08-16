/* =========================================
   CONTENEDOR DE PRODUCTOS
========================================= */

const contenedorProductos =
    document.getElementById("productos-container");


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";


    listaProductos.forEach(producto => {

        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add("producto-catalogo");


        tarjeta.innerHTML = `

            <div class="producto-imagenes">

                <img
                    src="${producto.imagenes[0]}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    data-indice="0"
                >

${producto.colores ? `

    <div class="colores-producto">

        ${producto.colores.map(color => {

            const coloresCSS = {
                verde: "#43a047",
                verde_oliva: "#636b2f",
                blanco: "#ffffff",
                negro: "#111111",
                gris: "#757575",
                marron: "#795548"
            };

            return `
                <span
                    class="color-producto"
                    title="${color}"
                    style="background-color: ${coloresCSS[color] || color};"
                ></span>
            `;

        }).join("")}

    </div>

` : ""}


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


/* =========================================
   CAMBIAR IMAGEN
========================================= */

function cambiarImagen(boton, direccion) {

    const contenedor =
        boton.closest(".producto-imagenes");


    const imagenActual =
        contenedor.querySelector(".imagen-producto");


    const datos =
        contenedor.querySelector(".imagenes-producto-data");


    const imagenes =
        JSON.parse(datos.dataset.imagenes);


    /* ==============================
       EVITAR ANIMACIONES SIMULTÁNEAS
    ============================== */

    if (contenedor.dataset.animando === "true") {
        return;
    }


    contenedor.dataset.animando = "true";


    /* ==============================
       ÍNDICE ACTUAL
    ============================== */

    let indice =
        parseInt(imagenActual.dataset.indice || "0");


    /* ==============================
       CALCULAR NUEVO ÍNDICE
    ============================== */

    let nuevoIndice =
        indice + direccion;


    if (nuevoIndice < 0) {

        nuevoIndice =
            imagenes.length - 1;

    }


    if (nuevoIndice >= imagenes.length) {

        nuevoIndice = 0;

    }


    /* ==============================
       CREAR NUEVA IMAGEN
    ============================== */

    const imagenNueva =
        document.createElement("img");


    imagenNueva.src =
        imagenes[nuevoIndice];


    imagenNueva.alt =
        imagenActual.alt;


    imagenNueva.classList.add("imagen-producto");


    /* ==============================
       POSICIÓN INICIAL
    ============================== */

    if (direccion === 1) {

        imagenNueva.style.transform =
            "translateX(100%)";

    } else {

        imagenNueva.style.transform =
            "translateX(-100%)";

    }


    /* ==============================
       COLOCAR NUEVA IMAGEN
    ============================== */

    contenedor.appendChild(imagenNueva);


    /* ==============================
       FORZAR RENDERIZADO
    ============================== */

    imagenNueva.offsetWidth;


    /* ==============================
       EJECUTAR ANIMACIÓN
    ============================== */

    requestAnimationFrame(() => {

        if (direccion === 1) {

            imagenActual.style.transform =
                "translateX(-100%)";

        } else {

            imagenActual.style.transform =
                "translateX(100%)";

        }


        imagenNueva.style.transform =
            "translateX(0)";

    });


    /* ==============================
       FINALIZAR ANIMACIÓN
    ============================== */

    setTimeout(() => {

        imagenNueva.dataset.indice =
            nuevoIndice;


        imagenActual.remove();


        contenedor.dataset.animando =
            "false";

    }, 350);

}


/* =========================================
   MOSTRAR PRODUCTOS AL CARGAR
========================================= */

mostrarProductos(productos);

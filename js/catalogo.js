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


        /* =====================================
           ABRIR PANEL AL HACER CLIC
        ===================================== */

        tarjeta.onclick = (evento) => {

            // Si se pulsa una flecha,
            // no abrir el panel.

            if (evento.target.closest(".flecha")) {
                return;
            }

            abrirProducto(producto.id);

        };


        tarjeta.innerHTML = `

            <div class="producto-imagenes">

                <img
                    src="${producto.imagenes[0]}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    data-indice="0"
                >


                ${
                    producto.colores
                    ? `

                        <div class="colores-producto">

                            ${producto.colores.map(color => {

                                const coloresCSS = {

                                    verde: "#43a047",

                                    verde_oliva: "#636b2f",

                                    azul: "#1976d2",

                                    rojo: "#e53935",

                                    blanco: "#ffffff",

                                    negro: "#111111",

                                    gris: "#757575",

                                    marron: "#795548"

                                };


                                return `

                                    <span
                                        class="color-producto"
                                        title="${color}"
                                        style="
                                            background-color:
                                            ${coloresCSS[color] || color};
                                        "
                                    ></span>

                                `;

                            }).join("")}

                        </div>

                    `
                    : ""
                }


                <!-- ==============================
                     FLECHA IZQUIERDA
                =============================== -->

                <button
                    class="flecha flecha-izquierda"
                    onclick="cambiarImagen(this, -1)"
                >

                    <i class="fa-solid fa-chevron-left"></i>

                </button>


                <!-- ==============================
                     FLECHA DERECHA
                =============================== -->

                <button
                    class="flecha flecha-derecha"
                    onclick="cambiarImagen(this, 1)"
                >

                    <i class="fa-solid fa-chevron-right"></i>

                </button>


                <!-- ==============================
                     DATOS DE IMÁGENES
                =============================== -->

                <div
                    class="imagenes-producto-data"
                    data-imagenes='${JSON.stringify(producto.imagenes)}'
                >
                </div>

            </div>


            <!-- =================================
                 INFORMACIÓN DEL PRODUCTO
            ================================== -->

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
   CAMBIAR IMAGEN DEL CATÁLOGO
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
   ABRIR PANEL DEL PRODUCTO
========================================= */

function abrirProducto(id) {

    /* ==============================
       BUSCAR PRODUCTO
    ============================== */

    const producto =
        productos.find(producto => producto.id === id);


    if (!producto) {
        return;
    }


    /* ==============================
       OBTENER PANEL
    ============================== */

    const panel =
        document.getElementById("producto-panel");


    const contenido =
        document.getElementById("producto-panel-contenido");


    /* ==============================
       CREAR CONTENIDO
    ============================== */

    contenido.innerHTML = `

        <!-- =================================
             IMAGEN GRANDE
        ================================== -->

        <div class="producto-panel-imagenes">

            <img
                src="${producto.imagenes[0]}"
                alt="${producto.nombre}"
                id="imagen-panel"
                data-indice="0"
            >


            ${
                producto.imagenes.length > 1
                ? `

                    <button
                        class="panel-flecha panel-flecha-izquierda"
                        onclick="cambiarImagenPanel(-1)"
                    >

                        <i class="fa-solid fa-chevron-left"></i>

                    </button>


                    <button
                        class="panel-flecha panel-flecha-derecha"
                        onclick="cambiarImagenPanel(1)"
                    >

                        <i class="fa-solid fa-chevron-right"></i>

                    </button>

                `
                : ""
            }

        </div>


        <!-- =================================
             INFORMACIÓN
        ================================== -->

        <div class="producto-panel-datos">

            <h1>
                ${producto.nombre}
            </h1>


            <p class="producto-panel-descripcion">
                ${producto.detalles}
            </p>


            <div class="producto-panel-precio">
                $${producto.precio.toFixed(2)}
            </div>


            <!-- =================================
                 CANTIDAD
            ================================== -->

            <div class="producto-cantidad">

                <button
                    onclick="cambiarCantidad(-1)"
                >
                    −
                </button>


                <span id="cantidad-producto">
                    1
                </span>


                <button
                    onclick="cambiarCantidad(1)"
                >
                    +
                </button>

            </div>


            <!-- =================================
                 BOTONES
            ================================== -->

            <div class="producto-panel-botones">

                <button
                    class="boton-carrito"
                    onclick="agregarAlCarrito(${producto.id})"
                >

                    <i class="fa-solid fa-cart-shopping"></i>

                    Agregar al carrito

                </button>


                <button
                    class="boton-comprar"
                    onclick="comprarAhora(${producto.id})"
                >

                    Comprar ahora

                </button>

            </div>

        </div>

    `;


    /* ==============================
       GUARDAR PRODUCTO ACTUAL
    ============================== */

    panel.dataset.productoId =
        producto.id;


    /* ==============================
       ABRIR PANEL
    ============================== */

    panel.classList.add("abierto");


    /* ==============================
       BLOQUEAR SCROLL DEL CATÁLOGO
    ============================== */

    document.body.style.overflow = "hidden";

}


/* =========================================
   CERRAR PANEL
========================================= */

function cerrarProducto() {

    const panel =
        document.getElementById("producto-panel");


    /* ==============================
       CERRAR PANEL
    ============================== */

    panel.classList.remove("abierto");


    /* ==============================
       VOLVER A PERMITIR SCROLL
    ============================== */

    document.body.style.overflow = "";

}


/* =========================================
   CAMBIAR IMAGEN DEL PANEL
========================================= */

function cambiarImagenPanel(direccion) {

    /* ==============================
       OBTENER PANEL
    ============================== */

    const panel =
        document.getElementById("producto-panel");


    /* ==============================
       OBTENER PRODUCTO ACTUAL
    ============================== */

    const id =
        parseInt(panel.dataset.productoId);


    const producto =
        productos.find(producto => producto.id === id);


    if (!producto) {
        return;
    }


    /* ==============================
       OBTENER IMAGEN
    ============================== */

    const imagen =
        document.getElementById("imagen-panel");


    /* ==============================
       ÍNDICE ACTUAL
    ============================== */

    let indice =
        parseInt(imagen.dataset.indice || "0");


    /* ==============================
       CALCULAR NUEVO ÍNDICE
    ============================== */

    indice += direccion;


    if (indice < 0) {

        indice =
            producto.imagenes.length - 1;

    }


    if (indice >= producto.imagenes.length) {

        indice = 0;

    }


    /* ==============================
       CAMBIAR IMAGEN
    ============================== */

    imagen.src =
        producto.imagenes[indice];


    imagen.dataset.indice =
        indice;

}


/* =========================================
   CAMBIAR CANTIDAD
========================================= */

function cambiarCantidad(cambio) {

    const elemento =
        document.getElementById("cantidad-producto");


    let cantidad =
        parseInt(elemento.textContent);


    cantidad += cambio;


    /* ==============================
       MÍNIMO: 1 PRODUCTO
    ============================== */

    if (cantidad < 1) {

        cantidad = 1;

    }


    elemento.textContent =
        cantidad;

}


/* =========================================
   AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(id) {

    const producto =
        productos.find(producto => producto.id === id);


    if (!producto) {
        return;
    }


    const cantidad =
        parseInt(
            document.getElementById(
                "cantidad-producto"
            ).textContent
        );


    alert(
        producto.nombre +
        " x" +
        cantidad +
        " agregado al carrito."
    );

}


/* =========================================
   COMPRAR AHORA
========================================= */

function comprarAhora(id) {

    const producto =
        productos.find(producto => producto.id === id);


    if (!producto) {
        return;
    }


    const cantidad =
        parseInt(
            document.getElementById(
                "cantidad-producto"
            ).textContent
        );


    alert(
        "Comprar ahora: " +
        producto.nombre +
        " x" +
        cantidad
    );

}

/* =========================================
   CERRAR PANEL DE PRODUCTO
========================================= */

function cerrarProducto() {

    const panel =
        document.getElementById("producto-panel");


    panel.classList.remove("abierto");

}

/* =========================================
   MOSTRAR PRODUCTOS AL CARGAR
========================================= */

mostrarProductos(productos);

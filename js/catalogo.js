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

                                    marron: "#795548",

                                    amarillo: "#facc15",

                                    naranja: "#f97316",

                                    morado: "#7e22ce"

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
   FILTRO DE CATEGORÍAS
========================================= */

const botonesCategorias =
    document.querySelectorAll(".categoria");


botonesCategorias.forEach(boton => {

    boton.addEventListener("click", (evento) => {

        evento.preventDefault();


        /* ==============================
           OBTENER CATEGORÍA
        ============================== */

        const categoria =
            boton.dataset.categoria;


        /* ==============================
           CAMBIAR BOTÓN ACTIVO
        ============================== */

        botonesCategorias.forEach(botonCategoria => {

            botonCategoria.classList.remove("activa");

        });


        boton.classList.add("activa");


        /* ==============================
           FILTRAR PRODUCTOS
        ============================== */

        if (categoria === "todos") {

            mostrarProductos(productos);

            return;

        }


        const productosFiltrados =
            productos.filter(producto =>
                producto.categoria === categoria
            );


        mostrarProductos(productosFiltrados);

    });

});


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
       CREAR SELECTOR DE COLORES
    ============================== */

    let selectorColores = "";


    if (producto.colores && producto.colores.length > 0) {

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


        selectorColores = `

            <div class="producto-seleccion">

                <div class="producto-seleccion-titulo">

                    Distribución por color

                </div>


                <div
                    class="producto-seleccion-colores"
                    id="selector-colores"
                >

                    ${
                        producto.colores.map((color, indice) => {

                            return `

                                <div
                                    class="opcion-color"
                                    data-color="${color}"
                                    data-cantidad="0"
                                >

                                    <div class="opcion-color-nombre">

                                        <span
                                            class="color-producto"
                                            style="
                                                background-color:
                                                ${coloresCSS[color] || color};
                                            "
                                        ></span>


                                        <span class="nombre-color">

                                            ${color.replace("_", " ")}

                                        </span>

                                    </div>


                                    <div class="cantidad-color">

                                        <button
                                            type="button"
                                            onclick="cambiarCantidadColor('${color}', -1)"
                                        >
                                            −
                                        </button>


                                        <span
                                            id="cantidad-color-${color}"
                                        >
                                            0
                                        </span>


                                        <button
                                            type="button"
                                            onclick="cambiarCantidadColor('${color}', 1)"
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>

                            `;

                        }).join("")

                    }

                </div>


                <p class="producto-seleccion-ayuda">

                    Asigna las unidades entre los colores disponibles.

                    La suma no puede superar la cantidad total.

                </p>

            </div>

        `;

    }


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
                 CANTIDAD TOTAL
            ================================== -->

            <div class="producto-seleccion">

                <div class="producto-seleccion-titulo">

                    Cantidad

                </div>


                <div class="producto-cantidad-contenedor">

                    <span class="producto-cantidad-label">

                        Unidades

                    </span>


                    <div class="producto-cantidad">

                        <button
                            type="button"
                            onclick="cambiarCantidad(-1)"
                        >

                            −

                        </button>


                        <span id="cantidad-producto">

                            1

                        </span>


                        <button
                            type="button"
                            onclick="cambiarCantidad(1)"
                        >

                            +

                        </button>

                    </div>

                </div>

            </div>


            ${selectorColores}


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
       BLOQUEAR SCROLL
    ============================== */

    document.body.style.overflow = "hidden";

}

/* =========================================
   CERRAR PANEL
========================================= */

function cerrarProducto() {

    const panel =
        document.getElementById("producto-panel");


    panel.classList.remove("abierto");


    document.body.style.overflow = "";

}


/* =========================================
   BOTÓN ATRÁS DEL PANEL
========================================= */

const botonAtras =
    document.getElementById("producto-panel-atras");


botonAtras.addEventListener("click", () => {

    cerrarProducto();

});


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
   CAMBIAR CANTIDAD TOTAL
========================================= */

function cambiarCantidad(cambio) {

    const elemento =
        document.getElementById("cantidad-producto");


    let cantidad =
        parseInt(elemento.textContent);


    cantidad += cambio;


    /* ==============================
       MÍNIMO: 1
    ============================== */

    if (cantidad < 1) {

        cantidad = 1;

    }


    elemento.textContent =
        cantidad;


    /* ==============================
       ACTUALIZAR TOTAL DE COLORES
    ============================== */

    const totalColores =
        document.getElementById(
            "cantidad-total-colores"
        );


    if (totalColores) {

        totalColores.textContent =
            cantidad;

    }


    /* ==============================
       AJUSTAR COLORES
    ============================== */

    ajustarColores(cantidad);

}


/* =========================================
   CAMBIAR CANTIDAD DE UN COLOR
========================================= */

function cambiarCantidadColor(color, cambio) {

    const cantidadTotal =
        parseInt(
            document.getElementById(
                "cantidad-producto"
            ).textContent
        );


    const elemento =
        document.getElementById(
            `cantidad-color-${color}`
        );


    if (!elemento) {
        return;
    }


    let cantidad =
        parseInt(elemento.textContent);


    const cantidadAnterior =
        cantidad;


    cantidad += cambio;


    /* ==============================
       NO PERMITIR MENOS DE 0
    ============================== */

    if (cantidad < 0) {

        cantidad = 0;

    }


    /* ==============================
       CALCULAR TOTAL ASIGNADO
    ============================== */

    const filas =
        document.querySelectorAll(
            ".color-panel-fila"
        );


    let totalAsignado = 0;


    filas.forEach(fila => {

        const numero =
            parseInt(
                fila.querySelector(
                    ".color-panel-cantidad span"
                ).textContent
            );


        totalAsignado += numero;

    });


    /* ==============================
       CALCULAR NUEVO TOTAL
    ============================== */

    const diferencia =
        cantidad -
        cantidadAnterior;


    const nuevoTotal =
        totalAsignado + diferencia;


    /* ==============================
       NO SUPERAR CANTIDAD TOTAL
    ============================== */

    if (nuevoTotal > cantidadTotal) {

        return;

    }


    /* ==============================
       GUARDAR CANTIDAD
    ============================== */

    elemento.textContent =
        cantidad;


    /* ==============================
       ACTUALIZAR INDICADOR
    ============================== */

    actualizarTotalColores();

}


/* =========================================
   ACTUALIZAR TOTAL DE COLORES
========================================= */

function actualizarTotalColores() {

    const elemento =
        document.getElementById(
            "colores-asignados"
        );


    if (!elemento) {
        return;
    }


    const cantidades =
        document.querySelectorAll(
            ".color-panel-cantidad span"
        );


    let total = 0;


    cantidades.forEach(cantidad => {

        total +=
            parseInt(cantidad.textContent);

    });


    elemento.textContent =
        total;

}


/* =========================================
   AJUSTAR COLORES
========================================= */

function ajustarColores(cantidadTotal) {

    const filas =
        document.querySelectorAll(
            ".color-panel-fila"
        );


    let totalAsignado = 0;


    /* ==============================
       CALCULAR TOTAL ACTUAL
    ============================== */

    filas.forEach(fila => {

        const cantidad =
            parseInt(
                fila.querySelector(
                    ".color-panel-cantidad span"
                ).textContent
            );


        totalAsignado += cantidad;

    });


    /* ==============================
       SI NO EXCEDE, NO HACER NADA
    ============================== */

    if (totalAsignado <= cantidadTotal) {

        actualizarTotalColores();

        return;

    }


    /* ==============================
       CALCULAR EXCESO
    ============================== */

    let exceso =
        totalAsignado -
        cantidadTotal;


    /* ==============================
       REDUCIR DESDE EL ÚLTIMO COLOR
    ============================== */

    for (
        let i = filas.length - 1;
        i >= 0 && exceso > 0;
        i--
    ) {

        const elemento =
            filas[i].querySelector(
                ".color-panel-cantidad span"
            );


        let cantidad =
            parseInt(elemento.textContent);


        const reducir =
            Math.min(
                cantidad,
                exceso
            );


        cantidad -=
            reducir;


        exceso -=
            reducir;


        elemento.textContent =
            cantidad;

    }


    /* ==============================
       ACTUALIZAR TOTAL
    ============================== */

    actualizarTotalColores();

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


    /* ==============================
       OBTENER CANTIDAD TOTAL
    ============================== */

    const cantidad =
        parseInt(
            document.getElementById(
                "cantidad-producto"
            ).textContent
        );


    /* ==============================
       PRODUCTO CON COLORES
    ============================== */

    if (
        producto.colores &&
        producto.colores.length > 0
    ) {

        const cantidades =
            document.querySelectorAll(
                ".color-panel-cantidad span"
            );


        let totalColores = 0;


        cantidades.forEach(elemento => {

            totalColores +=
                parseInt(
                    elemento.textContent
                );

        });


        /* ==============================
           OBLIGAR A ASIGNAR TODO
        ============================== */

        if (totalColores !== cantidad) {

            alert(
                "Debes asignar las " +
                cantidad +
                " unidades entre los colores disponibles."
            );

            return;

        }

    }


    /* ==============================
       POR AHORA SOLO MOSTRAR MENSAJE
    ============================== */

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
   MOSTRAR PRODUCTOS AL CARGAR
========================================= */

mostrarProductos(productos);

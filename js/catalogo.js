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

            /*
               Si se pulsa una flecha,
               no abrir el panel.
            */

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


                <!-- =================================
                     FLECHA IZQUIERDA
                ================================== -->

                <button
                    class="flecha flecha-izquierda"
                    onclick="cambiarImagen(this, -1)"
                >

                    <i class="fa-solid fa-chevron-left"></i>

                </button>


                <!-- =================================
                     FLECHA DERECHA
                ================================== -->

                <button
                    class="flecha flecha-derecha"
                    onclick="cambiarImagen(this, 1)"
                >

                    <i class="fa-solid fa-chevron-right"></i>

                </button>


                <!-- =================================
                     DATOS DE IMÁGENES
                ================================== -->

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
           MOSTRAR PRODUCTOS
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


    /*
       Si solamente existe una imagen,
       no hacemos nada.
    */

    if (imagenes.length <= 1) {
        return;
    }


    contenedor.dataset.animando = "true";


    /* ==============================
       ÍNDICE ACTUAL
    ============================== */

    let indice =
        parseInt(imagenActual.dataset.indice || "0");


    /* ==============================
       NUEVO ÍNDICE
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


    imagenNueva.dataset.indice =
        nuevoIndice;


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
       AÑADIR IMAGEN
    ============================== */

    contenedor.appendChild(imagenNueva);


    /* ==============================
       FORZAR RENDERIZADO
    ============================== */

    imagenNueva.offsetWidth;


    /* ==============================
       ANIMACIÓN
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
       FINALIZAR
    ============================== */

    setTimeout(() => {

        imagenActual.remove();


        contenedor.dataset.animando =
            "false";

    }, 350);

}


/* =========================================
   ABRIR PANEL DEL PRODUCTO
========================================= */

function abrirProducto(id) {

    const producto =
        productos.find(producto => producto.id === id);


    if (!producto) {
        return;
    }


    const panel =
        document.getElementById("producto-panel");


    const contenido =
        document.getElementById(
            "producto-panel-contenido"
        );


    /* =====================================
       SELECTOR DE COLORES
    ===================================== */

    let selectorColores = "";


    if (
        producto.colores &&
        producto.colores.length > 0
    ) {

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


        selectorColores = `

            <div class="producto-seleccion">

                <div class="producto-seleccion-titulo">

                    Distribución por color

                </div>


                <div
                    class="producto-seleccion-colores"
                    id="selector-colores"
                >

                    ${producto.colores.map(color => {

                        return `

                            <div
                                class="opcion-color"
                                data-color="${color}"
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
                                        class="boton-color-menos"
                                        onclick="
                                            cambiarCantidadColor(
                                                '${color}',
                                                -1
                                            )
                                        "
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
                                        class="boton-color-mas"
                                        onclick="
                                            cambiarCantidadColor(
                                                '${color}',
                                                1
                                            )
                                        "
                                    >

                                        +

                                    </button>

                                </div>

                            </div>

                        `;

                    }).join("")}

                </div>

            </div>

        `;

    }


    /* =====================================
       CONTENIDO DEL PANEL
    ===================================== */

    contenido.innerHTML = `

        <!-- =================================
             IMAGEN
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
                            id="boton-cantidad-mas"
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


    /* =====================================
       GUARDAR PRODUCTO ACTUAL
    ===================================== */

    panel.dataset.productoId =
        producto.id;


    /* =====================================
       ABRIR PANEL
    ===================================== */

    panel.classList.add("abierto");


    document.body.style.overflow =
        "hidden";


    /* =====================================
       ACTUALIZAR BOTONES
    ===================================== */

    actualizarBotonesColores();

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
   BOTÓN ATRÁS
========================================= */

const botonAtras =
    document.getElementById(
        "producto-panel-atras"
    );


if (botonAtras) {

    botonAtras.addEventListener(
        "click",
        cerrarProducto
    );

}


/* =========================================
   CAMBIAR IMAGEN DEL PANEL
========================================= */

function cambiarImagenPanel(direccion) {

    const panel =
        document.getElementById(
            "producto-panel"
        );


    const id =
        parseInt(
            panel.dataset.productoId
        );


    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) {
        return;
    }


    const imagen =
        document.getElementById(
            "imagen-panel"
        );


    if (!imagen) {
        return;
    }


    let indice =
        parseInt(
            imagen.dataset.indice || "0"
        );


    indice += direccion;


    if (indice < 0) {

        indice =
            producto.imagenes.length - 1;

    }


    if (
        indice >=
        producto.imagenes.length
    ) {

        indice = 0;

    }


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
        document.getElementById(
            "cantidad-producto"
        );


    if (!elemento) {
        return;
    }


    let cantidad =
        parseInt(
            elemento.textContent
        );


    const nuevaCantidad =
        cantidad + cambio;


    /* ==============================
       MÍNIMO: 1
    ============================== */

    if (nuevaCantidad < 1) {
        return;
    }


    /* ==============================
       GUARDAR
    ============================== */

    elemento.textContent =
        nuevaCantidad;


    /* ==============================
       AJUSTAR COLORES
    ============================== */

    if (nuevaCantidad < cantidad) {

        ajustarColores(nuevaCantidad);

    }


    /* ==============================
       ACTUALIZAR BOTONES
    ============================== */

    actualizarBotonesColores();

}


/* =========================================
   CAMBIAR CANTIDAD DE UN COLOR
========================================= */

function cambiarCantidadColor(
    color,
    cambio
) {

    const cantidadElemento =
        document.getElementById(
            "cantidad-producto"
        );


    const elemento =
        document.getElementById(
            `cantidad-color-${color}`
        );


    if (
        !cantidadElemento ||
        !elemento
    ) {
        return;
    }


    const cantidadTotal =
        parseInt(
            cantidadElemento.textContent
        );


    let cantidadColor =
        parseInt(
            elemento.textContent
        );


    const nuevaCantidad =
        cantidadColor + cambio;


    /* ==============================
       MÍNIMO: 0
    ============================== */

    if (nuevaCantidad < 0) {
        return;
    }


    /* ==============================
       TOTAL ACTUAL
    ============================== */

    const totalAsignado =
        obtenerTotalColores();


    /* ==============================
       SI AUMENTAMOS
    ============================== */

    if (
        cambio > 0 &&
        totalAsignado >= cantidadTotal
    ) {

        /*
           Simplemente no hacemos nada.

           NO mostramos alert.
        */

        return;

    }


    /* ==============================
       GUARDAR NUEVA CANTIDAD
    ============================== */

    elemento.textContent =
        nuevaCantidad;


    /* ==============================
       ACTUALIZAR BOTONES
    ============================== */

    actualizarBotonesColores();

}


/* =========================================
   OBTENER TOTAL DE COLORES
========================================= */

function obtenerTotalColores() {

    const elementos =
        document.querySelectorAll(
            ".cantidad-color span"
        );


    let total = 0;


    elementos.forEach(elemento => {

        total +=
            parseInt(
                elemento.textContent
            ) || 0;

    });


    return total;

}


/* =========================================
   ACTUALIZAR BOTONES DE COLORES
========================================= */

function actualizarBotonesColores() {

    const cantidadElemento =
        document.getElementById(
            "cantidad-producto"
        );


    if (!cantidadElemento) {
        return;
    }


    const cantidadTotal =
        parseInt(
            cantidadElemento.textContent
        );


    const totalAsignado =
        obtenerTotalColores();


    /* =====================================
       BOTONES + DE COLORES
    ===================================== */

    const botonesMas =
        document.querySelectorAll(
            ".boton-color-mas"
        );


    botonesMas.forEach(boton => {

        boton.disabled =
            totalAsignado >= cantidadTotal;

    });

}


/* =========================================
   AJUSTAR COLORES
========================================= */

function ajustarColores(cantidadTotal) {

    const elementos =
        document.querySelectorAll(
            ".cantidad-color span"
        );


    let totalAsignado =
        obtenerTotalColores();


    /* ==============================
       NO HAY EXCESO
    ============================== */

    if (totalAsignado <= cantidadTotal) {

        actualizarBotonesColores();

        return;

    }


    /* ==============================
       CALCULAR EXCESO
    ============================== */

    let exceso =
        totalAsignado -
        cantidadTotal;


    /* ==============================
       REDUCIR DESDE EL ÚLTIMO
    ============================== */

    for (
        let i = elementos.length - 1;
        i >= 0 && exceso > 0;
        i--
    ) {

        let cantidad =
            parseInt(
                elementos[i].textContent
            );


        if (cantidad <= 0) {
            continue;
        }


        const reducir =
            Math.min(
                cantidad,
                exceso
            );


        cantidad -=
            reducir;


        exceso -=
            reducir;


        elementos[i].textContent =
            cantidad;

    }


    actualizarBotonesColores();

}


/* =========================================
   OBTENER CARRITO
========================================= */

function obtenerCarrito() {

    const carritoGuardado =
        localStorage.getItem("carrito");


    if (!carritoGuardado) {

        return [];

    }


    try {

        return JSON.parse(
            carritoGuardado
        );

    } catch (error) {

        console.error(
            "Error al leer el carrito:",
            error
        );


        return [];

    }

}


/* =========================================
   GUARDAR CARRITO
========================================= */

function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


/* =========================================
   CREAR CLAVE DE DISTRIBUCIÓN
========================================= */

function crearClaveColores(
    distribucionColores
) {

    if (
        !distribucionColores ||
        distribucionColores.length === 0
    ) {

        return "";

    }


    return distribucionColores
        .sort((a, b) =>
            a.color.localeCompare(b.color)
        )
        .map(item =>
            `${item.color}:${item.cantidad}`
        )
        .join("|");

}


/* =========================================
   AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) {
        return;
    }


    /* ==============================
       CANTIDAD
    ============================== */

    const elementoCantidad =
        document.getElementById(
            "cantidad-producto"
        );


    if (!elementoCantidad) {
        return;
    }


    const cantidad =
        parseInt(
            elementoCantidad.textContent
        );


    /* =====================================
       DISTRIBUCIÓN DE COLORES
    ===================================== */

    let distribucionColores = [];


    if (
        producto.colores &&
        producto.colores.length > 0
    ) {

        const totalColores =
            obtenerTotalColores();


        /*
           Si todavía no se han
           asignado todas las unidades,
           no agregamos el producto.
        */

        if (totalColores !== cantidad) {

            alert(
                "Asigna todas las unidades a un color antes de continuar."
            );

            return;

        }


        const opciones =
            document.querySelectorAll(
                ".opcion-color"
            );


        opciones.forEach(opcion => {

            const color =
                opcion.dataset.color;


            const cantidadElemento =
                opcion.querySelector(
                    ".cantidad-color span"
                );


            const cantidadColor =
                parseInt(
                    cantidadElemento.textContent
                ) || 0;


            if (cantidadColor > 0) {

                distribucionColores.push({

                    color: color,

                    cantidad: cantidadColor

                });

            }

        });

    }


    /* =====================================
       OBTENER CARRITO ACTUAL
    ===================================== */

    const carrito =
        obtenerCarrito();


    /* =====================================
       CLAVE DE ESTA VARIACIÓN
    ===================================== */

    const claveColores =
        crearClaveColores(
            [...distribucionColores]
        );


    /* =====================================
       BUSCAR PRODUCTO IGUAL
    ===================================== */

    const productoExistente =
        carrito.find(item => {

            if (item.productoId !== producto.id) {
                return false;
            }


            return (
                crearClaveColores(
                    [...(item.colores || [])]
                ) === claveColores
            );

        });


    /* =====================================
       SI YA EXISTE
    ===================================== */

    if (productoExistente) {

        productoExistente.cantidad +=
            cantidad;


        /*
           También acumulamos
           las cantidades de color.
        */

        if (
            distribucionColores.length > 0
        ) {

            distribucionColores.forEach(
                nuevoColor => {

                    const colorExistente =
                        productoExistente.colores.find(
                            color =>
                                color.color ===
                                nuevoColor.color
                        );


                    if (colorExistente) {

                        colorExistente.cantidad +=
                            nuevoColor.cantidad;

                    }

                }
            );

        }

    }


    /* =====================================
       PRODUCTO NUEVO
    ===================================== */

    else {

        carrito.push({

            productoId: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            imagen: producto.imagenes[0],

            cantidad: cantidad,

            colores:
                distribucionColores

        });

    }


    /* =====================================
       GUARDAR
    ===================================== */

    guardarCarrito(carrito);


    /* =====================================
       COMPROBAR
    ===================================== */

    console.log(
        "Carrito actualizado:",
        carrito
    );


    /*
       POR AHORA dejamos este mensaje
       únicamente para comprobar que
       realmente se guardó.

       Después lo reemplazaremos por
       el contador visual del carrito.
    */

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
        productos.find(
            producto => producto.id === id
        );


    if (!producto) {
        return;
    }


    const cantidadElemento =
        document.getElementById(
            "cantidad-producto"
        );


    if (!cantidadElemento) {
        return;
    }


    const cantidad =
        parseInt(
            cantidadElemento.textContent
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

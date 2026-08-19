/* =========================================
   CARRITO DE COMPRAS
   Leo Tacticals
========================================= */


/* =========================================
   OBTENER ELEMENTOS DEL HTML
========================================= */

const listaCarrito =
    document.getElementById("carrito-lista");


const totalCarrito =
    document.getElementById("carrito-total");


const botonWhatsApp =
    document.getElementById("boton-whatsapp");


/* =========================================
   OBTENER CARRITO DEL NAVEGADOR
========================================= */

function obtenerCarrito() {

    const carritoGuardado =
        localStorage.getItem("carrito");


    if (!carritoGuardado) {

        return [];

    }


    try {

        return JSON.parse(carritoGuardado);

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
   MOSTRAR CARRITO
========================================= */

function mostrarCarrito() {

    const carrito =
        obtenerCarrito();


    listaCarrito.innerHTML = "";


    /* =====================================
       CARRITO VACÍO
    ===================================== */

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <div class="carrito-vacio">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>
                    Tu carrito está vacío
                </h2>

                <p>
                    Agrega productos desde nuestro catálogo.
                </p>

                <a
                    href="catalogo.html"
                    class="boton-comprar"
                >
                    Ir al catálogo
                </a>

            </div>

        `;


        totalCarrito.textContent =
            "$0.00";


        return;

    }


    /* =====================================
       GENERAR PRODUCTOS
    ===================================== */

    carrito.forEach((item, indice) => {


        const subtotal =
            item.precio *
            item.cantidad;


        const producto =
            document.createElement("div");


        producto.classList.add(
            "carrito-producto"
        );


        /* =================================
           COLORES
        ================================= */

        let coloresHTML = "";


        if (
            item.colores &&
            item.colores.length > 0
        ) {

            coloresHTML =
                item.colores.map((color, colorIndice) => {

                    return `

                        <div
                            class="carrito-color"
                            data-color-indice="${colorIndice}"
                        >

                            <div class="carrito-color-info">

                                <span
                                    class="
                                        color-producto
                                        color-${color.color}
                                    "
                                ></span>


                                <span class="carrito-color-nombre">

                                    ${color.color.replace("_", " ")}

                                </span>

                            </div>


                            <div class="carrito-color-cantidad">

                                <button
                                    type="button"
                                    class="carrito-color-menos"
                                    onclick="
                                        cambiarCantidadColorCarrito(
                                            ${indice},
                                            ${colorIndice},
                                            -1
                                        )
                                    "
                                >

                                    −

                                </button>


                                <span>

                                    ${color.cantidad}

                                </span>


                                <button
                                    type="button"
                                    class="carrito-color-mas"
                                    onclick="
                                        cambiarCantidadColorCarrito(
                                            ${indice},
                                            ${colorIndice},
                                            1
                                        )
                                    "
                                >

                                    +

                                </button>

                            </div>

                        </div>

                    `;

                }).join("");

        }


        /* =================================
           CONTENIDO
        ================================= */

        producto.innerHTML = `

            <!-- ==========================
                 IMAGEN
            =========================== -->

            <div class="carrito-producto-imagen">

                <img
                    src="${item.imagen}"
                    alt="${item.nombre}"
                >

            </div>


            <!-- ==========================
                 INFORMACIÓN
            =========================== -->

            <div class="carrito-producto-info">

                <h2>
                    ${item.nombre}
                </h2>


                <div class="carrito-producto-precio">

                    $${item.precio.toFixed(2)}

                    <span>
                        / unidad
                    </span>

                </div>


                <!-- ======================
                     COLORES
                ======================= -->

                ${
                    item.colores &&
                    item.colores.length > 0
                    ?

                    `

                        <div class="carrito-producto-colores">

                            <div class="carrito-colores-titulo">

                                Distribución por color

                            </div>


                            ${coloresHTML}

                        </div>

                    `

                    :

                    ""

                }

            </div>


            <!-- ==========================
                 CANTIDAD GENERAL
            =========================== -->

            <div class="carrito-producto-cantidad">

                <span>
                    Cantidad
                </span>


                <div class="carrito-cantidad-control">

                    <button
                        type="button"
                        onclick="
                            cambiarCantidadCarrito(
                                ${indice},
                                -1
                            )
                        "
                    >

                        −

                    </button>


                    <strong>

                        ${item.cantidad}

                    </strong>


                    <button
                        type="button"
                        onclick="
                            cambiarCantidadCarrito(
                                ${indice},
                                1
                            )
                        "
                    >

                        +

                    </button>

                </div>

            </div>


            <!-- ==========================
                 SUBTOTAL
            =========================== -->

            <div class="carrito-producto-subtotal">

                $${subtotal.toFixed(2)}

            </div>


            <!-- ==========================
                 ELIMINAR
            =========================== -->

            <button
                class="carrito-producto-eliminar"
                onclick="eliminarProducto(${indice})"
                title="Eliminar producto"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        listaCarrito.appendChild(producto);

    });


    /* =====================================
       ACTUALIZAR BOTONES DE COLORES
    ===================================== */

    actualizarBotonesColoresCarrito();


    /* =====================================
       ACTUALIZAR TOTAL
    ===================================== */

    calcularTotal();

}


/* =========================================
   CAMBIAR CANTIDAD GENERAL
========================================= */

function cambiarCantidadCarrito(
    indice,
    cambio
) {

    const carrito =
        obtenerCarrito();


    const item =
        carrito[indice];


    if (!item) {
        return;
    }


    const nuevaCantidad =
        item.cantidad + cambio;


    /* =====================================
       MÍNIMO: 1
    ===================================== */

    if (nuevaCantidad < 1) {

        return;

    }


    /* =====================================
       CAMBIAR CANTIDAD
    ===================================== */

    item.cantidad =
        nuevaCantidad;


    /* =====================================
       AJUSTAR COLORES
    ===================================== */

    if (
        item.colores &&
        item.colores.length > 0
    ) {

        ajustarColoresCarrito(item);

    }


    /* =====================================
       GUARDAR
    ===================================== */

    guardarCarrito(carrito);


    /* =====================================
       ACTUALIZAR
    ===================================== */

    mostrarCarrito();

}


/* =========================================
   CAMBIAR CANTIDAD DE UN COLOR
========================================= */

function cambiarCantidadColorCarrito(
    indiceProducto,
    indiceColor,
    cambio
) {

    const carrito =
        obtenerCarrito();


    const item =
        carrito[indiceProducto];


    if (!item) {
        return;
    }


    if (
        !item.colores ||
        !item.colores[indiceColor]
    ) {

        return;

    }


    const color =
        item.colores[indiceColor];


    const nuevaCantidad =
        color.cantidad + cambio;


    /* =====================================
       MÍNIMO: 0
    ===================================== */

    if (nuevaCantidad < 0) {

        return;

    }


    /* =====================================
       TOTAL ACTUAL DE COLORES
    ===================================== */

    let totalColores = 0;


    item.colores.forEach(colorItem => {

        totalColores +=
            colorItem.cantidad;

    });


    /* =====================================
       NO SUPERAR CANTIDAD TOTAL
    ===================================== */

    if (
        cambio > 0 &&
        totalColores >= item.cantidad
    ) {

        return;

    }


    /* =====================================
       GUARDAR NUEVA CANTIDAD
    ===================================== */

    color.cantidad =
        nuevaCantidad;


    /* =====================================
       GUARDAR
    ===================================== */

    guardarCarrito(carrito);


    /* =====================================
       ACTUALIZAR
    ===================================== */

    mostrarCarrito();

}


/* =========================================
   AJUSTAR COLORES
========================================= */

function ajustarColoresCarrito(item) {

    if (
        !item.colores ||
        item.colores.length === 0
    ) {

        return;

    }


    /* =====================================
       CALCULAR TOTAL
    ===================================== */

    let totalColores = 0;


    item.colores.forEach(color => {

        totalColores +=
            color.cantidad;

    });


    /* =====================================
       SI NO HAY EXCESO
    ===================================== */

    if (
        totalColores <= item.cantidad
    ) {

        return;

    }


    /* =====================================
       CALCULAR EXCESO
    ===================================== */

    let exceso =
        totalColores -
        item.cantidad;


    /* =====================================
       REDUCIR DESDE EL ÚLTIMO COLOR
    ===================================== */

    for (
        let i = item.colores.length - 1;

        i >= 0 && exceso > 0;

        i--
    ) {

        const color =
            item.colores[i];


        if (color.cantidad <= 0) {

            continue;

        }


        const reducir =
            Math.min(
                color.cantidad,
                exceso
            );


        color.cantidad -=
            reducir;


        exceso -=
            reducir;

    }

}


/* =========================================
   ACTUALIZAR BOTONES DE COLORES
========================================= */

function actualizarBotonesColoresCarrito() {

    const carrito =
        obtenerCarrito();


    const productos =
        document.querySelectorAll(
            ".carrito-producto"
        );


    productos.forEach((elemento, indice) => {

        const item =
            carrito[indice];


        if (!item) {
            return;
        }


        if (
            !item.colores ||
            item.colores.length === 0
        ) {

            return;

        }


        /* ==============================
           TOTAL DE COLORES
        ============================== */

        let totalColores = 0;


        item.colores.forEach(color => {

            totalColores +=
                color.cantidad;

        });


        /* ==============================
           BOTONES +
        ============================== */

        const botonesMas =
            elemento.querySelectorAll(
                ".carrito-color-mas"
            );


        botonesMas.forEach(boton => {

            boton.disabled =
                totalColores >= item.cantidad;

        });

    });

}


/* =========================================
   CALCULAR TOTAL
========================================= */

function calcularTotal() {

    const carrito =
        obtenerCarrito();


    let total = 0;


    carrito.forEach(item => {

        total +=
            item.precio *
            item.cantidad;

    });


    totalCarrito.textContent =
        "$" + total.toFixed(2);


    return total;

}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function eliminarProducto(indice) {

    const carrito =
        obtenerCarrito();


    carrito.splice(
        indice,
        1
    );


    guardarCarrito(carrito);


    mostrarCarrito();

}


/* =========================================
   GENERAR MENSAJE DE WHATSAPP
========================================= */

function enviarPedidoWhatsApp() {

    const carrito =
        obtenerCarrito();


    /* =====================================
       CARRITO VACÍO
    ===================================== */

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    /* =====================================
       CREAR MENSAJE
    ===================================== */

    let mensaje =
        "Hola, deseo realizar el siguiente pedido:\n\n";


    carrito.forEach(item => {

        const subtotal =
            item.precio *
            item.cantidad;


        mensaje +=
            "Producto: " +
            item.nombre +
            "\n";


        mensaje +=
            "Cantidad: " +
            item.cantidad +
            "\n";


        /* ==============================
           COLORES
        ============================== */

        if (
            item.colores &&
            item.colores.length > 0
        ) {

            mensaje +=
                "Colores:\n";


            item.colores.forEach(color => {

                mensaje +=
                    "- " +
                    color.color.replace("_", " ") +
                    ": " +
                    color.cantidad +
                    "\n";

            });

        }


        mensaje +=
            "Precio: $" +
            subtotal.toFixed(2) +
            "\n\n";

    });


    /* =====================================
       TOTAL
    ===================================== */

    const total =
        calcularTotal();


    mensaje +=
        "TOTAL: $" +
        total.toFixed(2);


    /* =====================================
       NÚMERO WHATSAPP
    ===================================== */

    const numero =
        "593985065665";


    /* =====================================
       URL
    ===================================== */

    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensaje);


    /* =====================================
       ABRIR WHATSAPP
    ===================================== */

    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   BOTÓN WHATSAPP
========================================= */

if (botonWhatsApp) {

    botonWhatsApp.addEventListener(
        "click",
        enviarPedidoWhatsApp
    );

}


/* =========================================
   MOSTRAR AL CARGAR
========================================= */

mostrarCarrito();

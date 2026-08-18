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


    /* =====================================
       LIMPIAR
    ===================================== */

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


        /* =================================
           SUBTOTAL
        ================================= */

        const subtotal =
            item.precio *
            item.cantidad;


        /* =================================
           CREAR ELEMENTO
        ================================= */

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
                item.colores.map(color => {

                    return `

                        <div class="carrito-color">

                            <span
                                class="
                                    color-producto
                                    color-${color.color}
                                "
                            ></span>

                            <span class="carrito-color-nombre">

                                ${color.color.replace("_", " ")}

                                ×

                                ${color.cantidad}

                            </span>

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

                </div>


                <!-- ======================
                     COLORES
                ======================= -->

                <div class="carrito-producto-colores">

                    ${coloresHTML}

                </div>

            </div>


            <!-- ==========================
                 CANTIDAD
            =========================== -->

            <div class="carrito-producto-cantidad">

                <span>
                    Cantidad
                </span>

                <strong>
                    ${item.cantidad}
                </strong>

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
       ACTUALIZAR TOTAL
    ===================================== */

    calcularTotal();

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


    /* =====================================
       ELIMINAR
    ===================================== */

    carrito.splice(
        indice,
        1
    );


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

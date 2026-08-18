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


    /*
       Si todavía no existe un carrito,
       devolvemos un arreglo vacío.
    */

    if (!carritoGuardado) {

        return [];

    }


    /*
       Convertimos el texto guardado
       nuevamente en un arreglo.
    */

    return JSON.parse(carritoGuardado);

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


    /*
       Limpiar la lista antes
       de volver a generarla.
    */

    listaCarrito.innerHTML = "";


    /* =====================================
       CARRITO VACÍO
    ====================================== */

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
    ====================================== */

    carrito.forEach((item, indice) => {


        /*
           Calcular precio de este producto.

           Ejemplo:

           $24.99 × 2 = $49.98
        */

        const subtotal =
            item.precio * item.cantidad;


        const producto =
            document.createElement("div");


        producto.classList.add(
            "carrito-producto"
        );


        producto.innerHTML = `

            <!-- ==========================
                 NOMBRE
            =========================== -->

            <div class="carrito-producto-nombre">

                <strong>
                    ${item.nombre}
                </strong>

            </div>


            <!-- ==========================
                 CANTIDAD
            =========================== -->

            <div class="carrito-producto-cantidad">

                <span>
                    ${item.cantidad}
                </span>

            </div>


            <!-- ==========================
                 COLOR
            =========================== -->

            <div class="carrito-producto-color">

                <span
                    class="color-producto color-${item.color}"
                ></span>

                <span>
                    ${item.color}
                </span>

            </div>


            <!-- ==========================
                 PRECIO
            =========================== -->

            <div class="carrito-producto-precio">

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
       CALCULAR TOTAL
    ====================================== */

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
            item.precio * item.cantidad;

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


    /*
       Eliminar el producto
       utilizando su posición.
    */

    carrito.splice(indice, 1);


    /*
       Guardar nuevamente
       el carrito.
    */

    guardarCarrito(carrito);


    /*
       Actualizar pantalla.
    */

    mostrarCarrito();

}


/* =========================================
   GENERAR MENSAJE DE WHATSAPP
========================================= */

function enviarPedidoWhatsApp() {

    const carrito =
        obtenerCarrito();


    /* =====================================
       EVITAR PEDIDO VACÍO
    ====================================== */

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    /* =====================================
       CREAR MENSAJE
    ====================================== */

    let mensaje =
        "Hola, deseo realizar el siguiente pedido:%0A%0A";


    carrito.forEach(item => {

        const subtotal =
            item.precio * item.cantidad;


        mensaje +=
            "Producto: " +
            item.nombre +
            "%0A";


        mensaje +=
            "Cantidad: " +
            item.cantidad +
            "%0A";


        mensaje +=
            "Color: " +
            item.color +
            "%0A";


        mensaje +=
            "Precio: $" +
            subtotal.toFixed(2) +
            "%0A%0A";

    });


    /* =====================================
       TOTAL
    ====================================== */

    const total =
        calcularTotal();


    mensaje +=
        "TOTAL: $" +
        total.toFixed(2);


    /* =====================================
       NÚMERO DE WHATSAPP
    ====================================== */

    const numero =
        "593985065665";


    /* =====================================
       CREAR URL
    ====================================== */

    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        mensaje;


    /* =====================================
       ABRIR WHATSAPP
    ====================================== */

    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   EVENTO DEL BOTÓN WHATSAPP
========================================= */

if (botonWhatsApp) {

    botonWhatsApp.addEventListener(
        "click",
        enviarPedidoWhatsApp
    );

}


/* =========================================
   MOSTRAR CARRITO AL CARGAR
========================================= */

mostrarCarrito();

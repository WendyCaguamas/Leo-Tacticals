/* =========================================
   CARRITO DE COMPRAS
   Leo Tacticals
========================================= */

/* =========================================
   OBTENER ELEMENTOS DEL HTML
========================================= */

const listaCarrito = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("carrito-total");

const costoEnvioHTML = document.getElementById("carrito-envio");
const mensajeEnvioHTML = document.getElementById("mensaje-envio");

const COSTO_ENVIO = 5;
const ENVIO_GRATIS_DESDE = 50;

const botonWhatsApp = document.getElementById("boton-whatsapp");


/* =========================================
   OBTENER CARRITO DEL NAVEGADOR
========================================= */

function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");

    if (!carritoGuardado) {
        return [];
    }

    try {
        return JSON.parse(carritoGuardado);
    } catch (error) {
        console.error("Error al leer el carrito:", error);
        return [];
    }
}


/* =========================================
   GUARDAR CARRITO
========================================= */

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


/* =========================================
   FORMATEAR NOMBRE DE VARIANTE
========================================= */

function formatearNombre(valor) {
    return String(valor ?? "")
        .replace(/_/g, " ")
        .trim();
}


/* =========================================
   MOSTRAR CARRITO
========================================= */

function mostrarCarrito() {
    if (!listaCarrito || !totalCarrito) {
        console.error("No se encontraron los elementos principales del carrito.");
        return;
    }

    const carrito = obtenerCarrito();

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Tu carrito está vacío</h2>

                <p>
                    Agrega productos desde nuestro catálogo.
                </p>

                <a href="catalogo.html" class="boton-comprar">
                    Ir al catálogo
                </a>
            </div>
        `;

        calcularTotal();
        return;
    }

    carrito.forEach((item, indice) => {
        const subtotal = Number(item.precio) * Number(item.cantidad);

        const producto = document.createElement("div");
        producto.classList.add("carrito-producto");

        /* DISTRIBUCIÓN POR COLORES */

        let coloresHTML = "";

        if (Array.isArray(item.colores) && item.colores.length > 0) {
            coloresHTML = item.colores.map((color, colorIndice) => `
                <div
                    class="carrito-color"
                    data-color-indice="${colorIndice}"
                >
                    <div class="carrito-color-info">
                        <span
                            class="color-producto color-${formatearNombre(color.color)}"
                        ></span>

                        <span class="carrito-color-nombre">
                            ${formatearNombre(color.color)}
                        </span>
                    </div>

                    <div class="carrito-color-cantidad">
                        <button
                            type="button"
                            class="carrito-color-menos"
                            aria-label="Reducir cantidad del color ${formatearNombre(color.color)}"
                            onclick="cambiarCantidadColorCarrito(${indice}, ${colorIndice}, -1)"
                        >−</button>

                        <span>${Number(color.cantidad) || 0}</span>

                        <button
                            type="button"
                            class="carrito-color-mas"
                            aria-label="Aumentar cantidad del color ${formatearNombre(color.color)}"
                            onclick="cambiarCantidadColorCarrito(${indice}, ${colorIndice}, 1)"
                        >+</button>
                    </div>
                </div>
            `).join("");
        }

        /* DISTRIBUCIÓN POR TALLAS */

        let tallasHTML = "";

        if (Array.isArray(item.tallas) && item.tallas.length > 0) {
            tallasHTML = item.tallas.map((talla, tallaIndice) => `
                <div
                    class="carrito-talla"
                    data-talla-indice="${tallaIndice}"
                >
                    <div class="carrito-talla-info">
                        <span class="carrito-talla-cuadrado">
                            ${formatearNombre(talla.talla)}
                        </span>
                    </div>

                    <div class="carrito-talla-cantidad-control">
                        <button
                            type="button"
                            class="carrito-talla-menos"
                            aria-label="Reducir cantidad de talla ${formatearNombre(talla.talla)}"
                            onclick="cambiarCantidadTallaCarrito(${indice}, ${tallaIndice}, -1)"
                        >−</button>

                        <span class="carrito-talla-cantidad">
                            ${Number(talla.cantidad) || 0}
                        </span>

                        <button
                            type="button"
                            class="carrito-talla-mas"
                            aria-label="Aumentar cantidad de talla ${formatearNombre(talla.talla)}"
                            onclick="cambiarCantidadTallaCarrito(${indice}, ${tallaIndice}, 1)"
                        >+</button>
                    </div>
                </div>
            `).join("");
        }

        /* CONTENIDO DEL PRODUCTO */

        producto.innerHTML = `
            <div class="carrito-producto-imagen">
                <img
                    src="${item.imagen}"
                    alt="${formatearNombre(item.nombre)}"
                >
            </div>

            <div class="carrito-producto-info">
                <h2 class="carrito-producto-nombre">
                    ${formatearNombre(item.nombre)}
                </h2>

                <div class="carrito-producto-unitario">
                    $${Number(item.precio).toFixed(2)}
                    <span>/ unidad</span>
                </div>

                ${
                    Array.isArray(item.colores) && item.colores.length > 0
                    ? `
                        <div class="carrito-producto-colores">
                            <div class="carrito-colores-titulo">
                                Distribución por color
                            </div>

                            ${coloresHTML}
                        </div>
                    `
                    : ""
                }

                ${
                    Array.isArray(item.tallas) && item.tallas.length > 0
                    ? `
                        <div class="carrito-producto-tallas">
                            <div class="carrito-tallas-titulo">
                                Distribución por talla
                            </div>

                            ${tallasHTML}
                        </div>
                    `
                    : ""
                }
            </div>

            <div class="carrito-producto-cantidad">
                <span class="carrito-producto-cantidad-label">
                    Cantidad total
                </span>

                <div class="carrito-cantidad-control">
                    <button
                        type="button"
                        aria-label="Reducir cantidad total"
                        onclick="cambiarCantidadCarrito(${indice}, -1)"
                    >−</button>

                    <strong>${Number(item.cantidad)}</strong>

                    <button
                        type="button"
                        aria-label="Aumentar cantidad total"
                        onclick="cambiarCantidadCarrito(${indice}, 1)"
                    >+</button>
                </div>
            </div>

            <div class="carrito-producto-subtotal">
                $${subtotal.toFixed(2)}
            </div>

            <button
                type="button"
                class="carrito-producto-eliminar"
                onclick="eliminarProducto(${indice})"
                title="Eliminar producto"
                aria-label="Eliminar ${formatearNombre(item.nombre)}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        listaCarrito.appendChild(producto);
    });

    actualizarBotonesColoresCarrito();
    actualizarBotonesTallasCarrito();

    calcularTotal();
}


/* =========================================
   CAMBIAR CANTIDAD GENERAL
========================================= */

function cambiarCantidadCarrito(indice, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito[indice];

    if (!item) return;

    const nuevaCantidad = Number(item.cantidad) + cambio;

    if (nuevaCantidad < 1) return;

    item.cantidad = nuevaCantidad;

    ajustarColoresCarrito(item);
    ajustarTallasCarrito(item);

    guardarCarrito(carrito);
    mostrarCarrito();
}


/* =========================================
   CAMBIAR CANTIDAD DE UN COLOR
========================================= */

function cambiarCantidadColorCarrito(indiceProducto, indiceColor, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito[indiceProducto];

    if (!item || !Array.isArray(item.colores)) return;

    const color = item.colores[indiceColor];

    if (!color) return;

    const nuevaCantidad = Number(color.cantidad) + cambio;

    if (nuevaCantidad < 0) return;

    const totalColores = item.colores.reduce(
        (total, colorItem) => total + (Number(colorItem.cantidad) || 0),
        0
    );

    if (cambio > 0 && totalColores >= Number(item.cantidad)) return;

    color.cantidad = nuevaCantidad;

    guardarCarrito(carrito);
    mostrarCarrito();
}


/* =========================================
   AJUSTAR COLORES
========================================= */

function ajustarColoresCarrito(item) {
    if (!Array.isArray(item.colores) || item.colores.length === 0) return;

    const totalColores = item.colores.reduce(
        (total, color) => total + (Number(color.cantidad) || 0),
        0
    );

    let exceso = totalColores - Number(item.cantidad);

    if (exceso <= 0) return;

    for (let i = item.colores.length - 1; i >= 0 && exceso > 0; i--) {
        const color = item.colores[i];
        const cantidadActual = Number(color.cantidad) || 0;

        if (cantidadActual <= 0) continue;

        const reducir = Math.min(cantidadActual, exceso);

        color.cantidad = cantidadActual - reducir;
        exceso -= reducir;
    }
}


/* =========================================
   ACTUALIZAR BOTONES DE COLORES
========================================= */

function actualizarBotonesColoresCarrito() {
    const carrito = obtenerCarrito();

    document.querySelectorAll(".carrito-producto").forEach((elemento, indice) => {
        const item = carrito[indice];

        if (!item || !Array.isArray(item.colores)) return;

        const totalColores = item.colores.reduce(
            (total, color) => total + (Number(color.cantidad) || 0),
            0
        );

        elemento.querySelectorAll(".carrito-color-mas").forEach(boton => {
            boton.disabled = totalColores >= Number(item.cantidad);
        });

        elemento.querySelectorAll(".carrito-color-menos").forEach((boton, colorIndice) => {
            const color = item.colores[colorIndice];
            boton.disabled = !color || Number(color.cantidad) <= 0;
        });
    });
}


/* =========================================
   CAMBIAR CANTIDAD DE UNA TALLA
========================================= */

function cambiarCantidadTallaCarrito(indiceProducto, indiceTalla, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito[indiceProducto];

    if (!item || !Array.isArray(item.tallas)) return;

    const talla = item.tallas[indiceTalla];

    if (!talla) return;

    const nuevaCantidad = Number(talla.cantidad) + cambio;

    if (nuevaCantidad < 0) return;

    const totalTallas = item.tallas.reduce(
        (total, tallaItem) => total + (Number(tallaItem.cantidad) || 0),
        0
    );

    if (cambio > 0 && totalTallas >= Number(item.cantidad)) return;

    talla.cantidad = nuevaCantidad;

    guardarCarrito(carrito);
    mostrarCarrito();
}


/* =========================================
   AJUSTAR TALLAS
========================================= */

function ajustarTallasCarrito(item) {
    if (!Array.isArray(item.tallas) || item.tallas.length === 0) return;

    const totalTallas = item.tallas.reduce(
        (total, talla) => total + (Number(talla.cantidad) || 0),
        0
    );

    let exceso = totalTallas - Number(item.cantidad);

    if (exceso <= 0) return;

    for (let i = item.tallas.length - 1; i >= 0 && exceso > 0; i--) {
        const talla = item.tallas[i];
        const cantidadActual = Number(talla.cantidad) || 0;

        if (cantidadActual <= 0) continue;

        const reducir = Math.min(cantidadActual, exceso);

        talla.cantidad = cantidadActual - reducir;
        exceso -= reducir;
    }
}


/* =========================================
   ACTUALIZAR BOTONES DE TALLAS
========================================= */

function actualizarBotonesTallasCarrito() {
    const carrito = obtenerCarrito();

    document.querySelectorAll(".carrito-producto").forEach((elemento, indice) => {
        const item = carrito[indice];

        if (!item || !Array.isArray(item.tallas)) return;

        const totalTallas = item.tallas.reduce(
            (total, talla) => total + (Number(talla.cantidad) || 0),
            0
        );

        elemento.querySelectorAll(".carrito-talla-mas").forEach(boton => {
            boton.disabled = totalTallas >= Number(item.cantidad);
        });

        elemento.querySelectorAll(".carrito-talla-menos").forEach((boton, tallaIndice) => {
            const talla = item.tallas[tallaIndice];
            boton.disabled = !talla || Number(talla.cantidad) <= 0;
        });
    });
}


/* =========================================
   CALCULAR TOTAL Y ENVÍO
========================================= */

function calcularTotal() {
    const carrito = obtenerCarrito();

    const subtotal = carrito.reduce(
        (suma, item) => suma + (Number(item.precio) * Number(item.cantidad)),
        0
    );

    let costoEnvio = 0;

    if (carrito.length > 0 && subtotal < ENVIO_GRATIS_DESDE) {
        costoEnvio = COSTO_ENVIO;
    }

    const total = subtotal + costoEnvio;

    if (totalCarrito) {
        totalCarrito.textContent = "$" + total.toFixed(2);
    }

    if (costoEnvioHTML) {
        costoEnvioHTML.textContent =
            carrito.length > 0 && costoEnvio === 0
                ? "GRATIS"
                : "$" + costoEnvio.toFixed(2);
    }

    if (mensajeEnvioHTML) {
        if (carrito.length === 0) {
            mensajeEnvioHTML.textContent =
                "Agrega productos para conocer el costo de envío.";
        } else if (subtotal >= ENVIO_GRATIS_DESDE) {
            mensajeEnvioHTML.textContent =
                "¡Tu pedido tiene envío gratis!";
        } else {
            const faltante = ENVIO_GRATIS_DESDE - subtotal;

            mensajeEnvioHTML.textContent =
                "Agrega $" + faltante.toFixed(2) +
                " más para obtener envío gratis.";
        }
    }

    return {
        subtotal: subtotal,
        costoEnvio: costoEnvio,
        total: total
    };
}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function eliminarProducto(indice) {
    const carrito = obtenerCarrito();

    carrito.splice(indice, 1);

    guardarCarrito(carrito);
    mostrarCarrito();
}


/* =========================================
   GENERAR MENSAJE DE WHATSAPP
========================================= */

function enviarPedidoWhatsApp() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola, deseo realizar el siguiente pedido:\n\n";

    carrito.forEach(item => {
        const subtotal = Number(item.precio) * Number(item.cantidad);

        mensaje += "Producto: " + item.nombre + "\n";
        mensaje += "Cantidad total: " + item.cantidad + "\n";

        if (Array.isArray(item.colores) && item.colores.length > 0) {
            mensaje += "Distribución por color:\n";

            item.colores.forEach(color => {
                mensaje += "- " +
                    formatearNombre(color.color) +
                    ": " +
                    (Number(color.cantidad) || 0) +
                    "\n";
            });
        }

        if (Array.isArray(item.tallas) && item.tallas.length > 0) {
            mensaje += "Distribución por talla:\n";

            item.tallas.forEach(talla => {
                mensaje += "- Talla " +
                    formatearNombre(talla.talla) +
                    ": " +
                    (Number(talla.cantidad) || 0) +
                    "\n";
            });
        }

        mensaje += "Subtotal: $" + subtotal.toFixed(2) + "\n\n";
    });

    const resumen = calcularTotal();

    mensaje += "Subtotal: $" + resumen.subtotal.toFixed(2) + "\n";

    mensaje += resumen.costoEnvio === 0
        ? "Envío: GRATIS\n"
        : "Envío: $" + resumen.costoEnvio.toFixed(2) + "\n";

    mensaje += "TOTAL DEL PEDIDO: $" + resumen.total.toFixed(2);

    const numero = "593985065665";

    const url = "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(url, "_blank");
}


/* =========================================
   BOTÓN WHATSAPP
========================================= */

if (botonWhatsApp) {
    botonWhatsApp.addEventListener("click", enviarPedidoWhatsApp);
}


/* =========================================
   MOSTRAR AL CARGAR
========================================= */

mostrarCarrito();

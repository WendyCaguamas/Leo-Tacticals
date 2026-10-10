```javascript
/* =========================================
   CONTENEDOR DE PRODUCTOS
========================================= */

const contenedorProductos =
    document.getElementById("productos-container");


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos(listaProductos) {

    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = "";

    listaProductos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto-catalogo");

        tarjeta.onclick = (evento) => {

            if (evento.target.closest(".flecha")) return;

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
                    producto.colores && producto.colores.length > 0
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
                                    morado: "#7e22ce",
                                    rosa: "#ffc0cb"
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
                    `
                    : ""
                }

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
                ></div>

            </div>

            <div class="producto-datos">

                <h2>${producto.nombre}</h2>

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

        const categoria = boton.dataset.categoria;

        botonesCategorias.forEach(botonCategoria => {
            botonCategoria.classList.remove("activa");
        });

        boton.classList.add("activa");

        if (categoria === "todos") {
            mostrarProductos(productos);
            return;
        }

        const productosFiltrados = productos.filter(producto =>
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

    if (contenedor.dataset.animando === "true") return;

    if (imagenes.length <= 1) return;

    contenedor.dataset.animando = "true";

    let indice = parseInt(imagenActual.dataset.indice || "0");

    let nuevoIndice = indice + direccion;

    if (nuevoIndice < 0) {
        nuevoIndice = imagenes.length - 1;
    }

    if (nuevoIndice >= imagenes.length) {
        nuevoIndice = 0;
    }

    const imagenNueva = document.createElement("img");

    imagenNueva.src = imagenes[nuevoIndice];
    imagenNueva.alt = imagenActual.alt;

    imagenNueva.classList.add("imagen-producto");

    imagenNueva.dataset.indice = nuevoIndice;

    imagenNueva.style.transform =
        direccion === 1
        ? "translateX(100%)"
        : "translateX(-100%)";

    contenedor.appendChild(imagenNueva);

    imagenNueva.offsetWidth;

    requestAnimationFrame(() => {

        imagenActual.style.transform =
            direccion === 1
            ? "translateX(-100%)"
            : "translateX(100%)";

        imagenNueva.style.transform = "translateX(0)";

    });

    setTimeout(() => {

        imagenActual.remove();

        contenedor.dataset.animando = "false";

    }, 350);

}


/* =========================================
   ABRIR PANEL DEL PRODUCTO
========================================= */

function abrirProducto(id) {

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) return;

    const panel = document.getElementById("producto-panel");

    const contenido =
        document.getElementById("producto-panel-contenido");

    if (!panel || !contenido) return;


    /* =====================================
       SELECTOR DE COLORES
    ====================================== */

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
            marron: "#795548",
            amarillo: "#facc15",
            naranja: "#f97316",
            morado: "#7e22ce",
            rosa: "#ffc0cb"
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

                    ${producto.colores.map(color => `

                        <div
                            class="opcion-color"
                            data-color="${color}"
                        >

                            <div class="opcion-color-nombre">

                                <span
                                    class="color-producto"
                                    style="background-color: ${coloresCSS[color] || color};"
                                ></span>

                                <span class="nombre-color">
                                    ${color.replace("_", " ")}
                                </span>

                            </div>

                            <div class="cantidad-color">

                                <button
                                    type="button"
                                    class="boton-color-menos"
                                    onclick="cambiarCantidadColor('${color}', -1)"
                                >−</button>

                                <span id="cantidad-color-${color}">0</span>

                                <button
                                    type="button"
                                    class="boton-color-mas"
                                    onclick="cambiarCantidadColor('${color}', 1)"
                                >+</button>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>

        `;

    }


    /* =====================================
       SELECTOR DE TALLAS
    ====================================== */

    let selectorTallas = "";

    if (producto.tallas && producto.tallas.length > 0) {

        selectorTallas = `

            <div class="producto-seleccion">

                <div class="producto-seleccion-titulo">
                    Distribución por talla
                </div>

                <div
                    class="producto-seleccion-tallas"
                    id="selector-tallas"
                >

                    ${producto.tallas.map(talla => `

                        <div
                            class="opcion-talla"
                            data-talla="${talla}"
                        >

                            <div class="opcion-talla-nombre">

                                <span class="talla-producto">
                                    ${talla}
                                </span>

                            </div>

                            <div class="cantidad-talla">

                                <button
                                    type="button"
                                    class="boton-talla-menos"
                                    onclick="cambiarCantidadTalla('${talla}', -1)"
                                >−</button>

                                <span id="cantidad-talla-${talla}">0</span>

                                <button
                                    type="button"
                                    class="boton-talla-mas"
                                    onclick="cambiarCantidadTalla('${talla}', 1)"
                                >+</button>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>

        `;

    }


    /* =====================================
       CONTENIDO DEL PANEL
    ====================================== */

    contenido.innerHTML = `

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

        <div class="producto-panel-datos">

            <h1>${producto.nombre}</h1>

            <p class="producto-panel-descripcion">
                ${producto.detalles}
            </p>

            <div class="producto-panel-precio">
                $${producto.precio.toFixed(2)}
            </div>

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
                        >−</button>

                        <span id="cantidad-producto">1</span>

                        <button
                            type="button"
                            id="boton-cantidad-mas"
                            onclick="cambiarCantidad(1)"
                        >+</button>

                    </div>

                </div>

            </div>

            ${selectorColores}

            ${selectorTallas}

            <div class="producto-panel-botones">

                <button
                    type="button"
                    class="boton-carrito"
                    onclick="agregarAlCarrito(${producto.id})"
                >
                    <i class="fa-solid fa-cart-shopping"></i>
                    Agregar al carrito
                </button>

                <button
                    type="button"
                    class="boton-comprar"
                    onclick="comprarAhora(${producto.id})"
                >
                    Comprar ahora
                </button>

            </div>

        </div>

    `;


    panel.dataset.productoId = producto.id;

    panel.classList.add("abierto");

    document.body.style.overflow = "hidden";

    actualizarBotonesColores();
    actualizarBotonesTallas();

}


/* =========================================
   CERRAR PANEL
========================================= */

function cerrarProducto() {

    const panel = document.getElementById("producto-panel");

    if (!panel) return;

    panel.classList.remove("abierto");

    document.body.style.overflow = "";

}

const botonAtras =
    document.getElementById("producto-panel-atras");

if (botonAtras) {
    botonAtras.addEventListener("click", cerrarProducto);
}


/* =========================================
   CAMBIAR IMAGEN DEL PANEL
========================================= */

function cambiarImagenPanel(direccion) {

    const panel = document.getElementById("producto-panel");

    if (!panel) return;

    const id = parseInt(panel.dataset.productoId);

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) return;

    const imagen = document.getElementById("imagen-panel");

    if (!imagen) return;

    let indice = parseInt(imagen.dataset.indice || "0");

    indice += direccion;

    if (indice < 0) {
        indice = producto.imagenes.length - 1;
    }

    if (indice >= producto.imagenes.length) {
        indice = 0;
    }

    imagen.src = producto.imagenes[indice];

    imagen.dataset.indice = indice;

}


/* =========================================
   CAMBIAR CANTIDAD TOTAL
========================================= */

function cambiarCantidad(cambio) {

    const elemento =
        document.getElementById("cantidad-producto");

    if (!elemento) return;

    let cantidad = parseInt(elemento.textContent);

    const nuevaCantidad = cantidad + cambio;

    if (nuevaCantidad < 1) return;

    elemento.textContent = nuevaCantidad;

    if (nuevaCantidad < cantidad) {

        ajustarColores(nuevaCantidad);
        ajustarTallas(nuevaCantidad);

    }

    actualizarBotonesColores();
    actualizarBotonesTallas();

}


/* =========================================
   CAMBIAR CANTIDAD DE UN COLOR
========================================= */

function cambiarCantidadColor(color, cambio) {

    const cantidadElemento =
        document.getElementById("cantidad-producto");

    const elemento =
        document.getElementById(`cantidad-color-${color}`);

    if (!cantidadElemento || !elemento) return;

    const cantidadTotal = parseInt(cantidadElemento.textContent);

    let cantidadColor = parseInt(elemento.textContent);

    const nuevaCantidad = cantidadColor + cambio;

    if (nuevaCantidad < 0) return;

    const totalAsignado = obtenerTotalColores();

    if (cambio > 0 && totalAsignado >= cantidadTotal) return;

    elemento.textContent = nuevaCantidad;

    actualizarBotonesColores();

}


/* =========================================
   OBTENER TOTAL DE COLORES
========================================= */

function obtenerTotalColores() {

    const elementos =
        document.querySelectorAll(".cantidad-color span");

    let total = 0;

    elementos.forEach(elemento => {
        total += parseInt(elemento.textContent) || 0;
    });

    return total;

}


/* =========================================
   ACTUALIZAR BOTONES DE COLORES
========================================= */

function actualizarBotonesColores() {

    const cantidadElemento =
        document.getElementById("cantidad-producto");

    if (!cantidadElemento) return;

    const cantidadTotal = parseInt(cantidadElemento.textContent);

    const totalAsignado = obtenerTotalColores();

    document.querySelectorAll(".boton-color-mas").forEach(boton => {
        boton.disabled = totalAsignado >= cantidadTotal;
    });

}


/* =========================================
   AJUSTAR COLORES
========================================= */

function ajustarColores(cantidadTotal) {

    const elementos =
        document.querySelectorAll(".cantidad-color span");

    let totalAsignado = obtenerTotalColores();

    if (totalAsignado <= cantidadTotal) {
        actualizarBotonesColores();
        return;
    }

    let exceso = totalAsignado - cantidadTotal;

    for (let i = elementos.length - 1; i >= 0 && exceso > 0; i--) {

        let cantidad = parseInt(elementos[i].textContent);

        if (cantidad <= 0) continue;

        const reducir = Math.min(cantidad, exceso);

        cantidad -= reducir;
        exceso -= reducir;

        elementos[i].textContent = cantidad;

    }

    actualizarBotonesColores();

}


/* =========================================
   CAMBIAR CANTIDAD DE UNA TALLA
========================================= */

function cambiarCantidadTalla(talla, cambio) {

    const cantidadElemento =
        document.getElementById("cantidad-producto");

    const elemento =
        document.getElementById(`cantidad-talla-${talla}`);

    if (!cantidadElemento || !elemento) return;

    const cantidadTotal = parseInt(cantidadElemento.textContent);

    let cantidadTalla = parseInt(elemento.textContent);

    const nuevaCantidad = cantidadTalla + cambio;

    if (nuevaCantidad < 0) return;

    const totalAsignado = obtenerTotalTallas();

    if (cambio > 0 && totalAsignado >= cantidadTotal) return;

    elemento.textContent = nuevaCantidad;

    actualizarBotonesTallas();

}


/* =========================================
   OBTENER TOTAL DE TALLAS
========================================= */

function obtenerTotalTallas() {

    const elementos =
        document.querySelectorAll(".cantidad-talla span");

    let total = 0;

    elementos.forEach(elemento => {
        total += parseInt(elemento.textContent) || 0;
    });

    return total;

}


/* =========================================
   ACTUALIZAR BOTONES DE TALLAS
========================================= */

function actualizarBotonesTallas() {

    const cantidadElemento =
        document.getElementById("cantidad-producto");

    if (!cantidadElemento) return;

    const cantidadTotal = parseInt(cantidadElemento.textContent);

    const totalAsignado = obtenerTotalTallas();

    document.querySelectorAll(".boton-talla-mas").forEach(boton => {
        boton.disabled = totalAsignado >= cantidadTotal;
    });

}


/* =========================================
   AJUSTAR TALLAS
========================================= */

function ajustarTallas(cantidadTotal) {

    const elementos =
        document.querySelectorAll(".cantidad-talla span");

    let totalAsignado = obtenerTotalTallas();

    if (totalAsignado <= cantidadTotal) {
        actualizarBotonesTallas();
        return;
    }

    let exceso = totalAsignado - cantidadTotal;

    for (let i = elementos.length - 1; i >= 0 && exceso > 0; i--) {

        let cantidad = parseInt(elementos[i].textContent);

        if (cantidad <= 0) continue;

        const reducir = Math.min(cantidad, exceso);

        cantidad -= reducir;
        exceso -= reducir;

        elementos[i].textContent = cantidad;

    }

    actualizarBotonesTallas();

}


/* =========================================
   OBTENER CARRITO
========================================= */

function obtenerCarrito() {

    const carritoGuardado = localStorage.getItem("carrito");

    if (!carritoGuardado) return [];

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
   CREAR CLAVE DE DISTRIBUCIÓN DE COLORES
========================================= */

function crearClaveColores(distribucionColores) {

    if (!distribucionColores || distribucionColores.length === 0) {
        return "";
    }

    return [...distribucionColores]
        .sort((a, b) => a.color.localeCompare(b.color))
        .map(item => `${item.color}:${item.cantidad}`)
        .join("|");

}


/* =========================================
   CREAR CLAVE DE DISTRIBUCIÓN DE TALLAS
========================================= */

function crearClaveTallas(distribucionTallas) {

    if (!distribucionTallas || distribucionTallas.length === 0) {
        return "";
    }

    return [...distribucionTallas]
        .sort((a, b) => Number(a.talla) - Number(b.talla))
        .map(item => `${item.talla}:${item.cantidad}`)
        .join("|");

}


/* =========================================
   OBTENER DATOS DEL PRODUCTO ACTUAL
========================================= */

function obtenerDatosProductoActual(id) {

    const producto = productos.find(
        producto => producto.id === id
    );

    if (!producto) return null;

    const elementoCantidad =
        document.getElementById("cantidad-producto");

    if (!elementoCantidad) return null;

    const cantidad = parseInt(elementoCantidad.textContent);


    /* =====================================
       DISTRIBUCIÓN DE COLORES
    ====================================== */

    let distribucionColores = [];

    if (producto.colores && producto.colores.length > 0) {

        const totalColores = obtenerTotalColores();

        if (totalColores !== cantidad) {

            alert("Asigna todas las unidades a un color antes de continuar.");

            return null;

        }

        document.querySelectorAll(".opcion-color").forEach(opcion => {

            const color = opcion.dataset.color;

            const cantidadElemento =
                opcion.querySelector(".cantidad-color span");

            const cantidadColor =
                parseInt(cantidadElemento.textContent) || 0;

            if (cantidadColor > 0) {
                distribucionColores.push({
                    color: color,
                    cantidad: cantidadColor
                });
            }

        });

    }


    /* =====================================
       DISTRIBUCIÓN DE TALLAS
    ====================================== */

    let distribucionTallas = [];

    if (producto.tallas && producto.tallas.length > 0) {

        const totalTallas = obtenerTotalTallas();

        if (totalTallas !== cantidad) {

            alert("Asigna todas las unidades a una talla antes de continuar.");

            return null;

        }

        document.querySelectorAll(".opcion-talla").forEach(opcion => {

            const talla = opcion.dataset.talla;

            const cantidadElemento =
                opcion.querySelector(".cantidad-talla span");

            const cantidadTalla =
                parseInt(cantidadElemento.textContent) || 0;

            if (cantidadTalla > 0) {
                distribucionTallas.push({
                    talla: talla,
                    cantidad: cantidadTalla
                });
            }

        });

    }


    return {
        producto,
        cantidad,
        distribucionColores,
        distribucionTallas
    };

}


/* =========================================
   GUARDAR PRODUCTO EN CARRITO
========================================= */

function guardarProductoEnCarrito(datos) {

    if (!datos) return false;

    const producto = datos.producto;
    const cantidad = datos.cantidad;

    const distribucionColores = datos.distribucionColores || [];
    const distribucionTallas = datos.distribucionTallas || [];

    const carrito = obtenerCarrito();

    const claveColores = crearClaveColores(distribucionColores);
    const claveTallas = crearClaveTallas(distribucionTallas);


    /* =====================================
       BUSCAR PRODUCTO IGUAL
    ====================================== */

    const productoExistente = carrito.find(item => {

        if (item.productoId !== producto.id) return false;

        const coloresExistentes =
            crearClaveColores(item.colores || []);

        const tallasExistentes =
            crearClaveTallas(item.tallas || []);

        return (
            coloresExistentes === claveColores &&
            tallasExistentes === claveTallas
        );

    });


    /* =====================================
       SI YA EXISTE
    ====================================== */

    if (productoExistente) {

        productoExistente.cantidad += cantidad;

        distribucionColores.forEach(nuevoColor => {

            const colorExistente =
                (productoExistente.colores || []).find(
                    color => color.color === nuevoColor.color
                );

            if (colorExistente) {

                colorExistente.cantidad += nuevoColor.cantidad;

            } else {

                productoExistente.colores.push({
                    color: nuevoColor.color,
                    cantidad: nuevoColor.cantidad
                });

            }

        });

        distribucionTallas.forEach(nuevaTalla => {

            const tallaExistente =
                (productoExistente.tallas || []).find(
                    talla => String(talla.talla) === String(nuevaTalla.talla)
                );

            if (tallaExistente) {

                tallaExistente.cantidad += nuevaTalla.cantidad;

            } else {

                if (!productoExistente.tallas) {
                    productoExistente.tallas = [];
                }

                productoExistente.tallas.push({
                    talla: nuevaTalla.talla,
                    cantidad: nuevaTalla.cantidad
                });

            }

        });

    }


    /* =====================================
       PRODUCTO NUEVO
    ====================================== */

    else {

        carrito.push({

            productoId: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            imagen: producto.imagenes[0],

            cantidad: cantidad,

            colores: distribucionColores,

            tallas: distribucionTallas

        });

    }


    /* =====================================
       GUARDAR
    ====================================== */

    guardarCarrito(carrito);

    console.log("Carrito actualizado:", carrito);

    return true;

}


/* =========================================
   POPUP DE PRODUCTO AGREGADO
========================================= */

function mostrarPopupAgregado(nombre, cantidad) {

    const popupAnterior = document.getElementById("popup-carrito");

    if (popupAnterior) popupAnterior.remove();

    const popup = document.createElement("div");

    popup.id = "popup-carrito";
    popup.className = "popup-carrito";

    popup.innerHTML = `

        <div class="popup-carrito-contenido">

            <div class="popup-carrito-icono">
                <i class="fa-solid fa-check"></i>
            </div>

            <div class="popup-carrito-texto">

                <h2>¡Agregado al carrito!</h2>

                <p>${nombre}</p>

                <span>
                    ${cantidad}
                    ${cantidad === 1 ? "unidad" : "unidades"}
                    ${cantidad === 1 ? "agregada" : "agregadas"}
                </span>

            </div>

        </div>

    `;

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            popup.classList.add("visible");
        });
    });

    setTimeout(() => {

        popup.classList.remove("visible");

        setTimeout(() => {
            if (popup.parentNode) popup.remove();
        }, 400);

    }, 2500);

}


/* =========================================
   AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(id) {

    const datos = obtenerDatosProductoActual(id);

    if (!datos) return;

    const guardado = guardarProductoEnCarrito(datos);

    if (!guardado) return;

    mostrarPopupAgregado(
        datos.producto.nombre,
        datos.cantidad
    );

}


/* =========================================
   COMPRAR AHORA
========================================= */

function comprarAhora(id) {

    const datos = obtenerDatosProductoActual(id);

    if (!datos) return;

    const guardado = guardarProductoEnCarrito(datos);

    if (!guardado) return;

    window.location.href = "carrito.html";

}


/* =========================================
   MOSTRAR PRODUCTOS AL CARGAR
========================================= */

mostrarProductos(productos);
```

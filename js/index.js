/* =========================================
   PRODUCTOS DESTACADOS
========================================= */

const contenedorDestacados =
    document.getElementById("productos-destacados");


/* =========================================
   COMPROBAR CONTENEDOR
========================================= */

if (contenedorDestacados) {

    /* =====================================
       PRODUCTOS DESTACADOS
    ====================================== */

    const productosDestacados =
        productos.slice(0, 3);


    /* =====================================
       MOSTRAR PRODUCTOS
    ====================================== */

    productosDestacados.forEach(producto => {

        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add(
            "producto-catalogo"
        );


        /* =================================
           ABRIR PRODUCTO EN CATÁLOGO
        ================================= */

        tarjeta.onclick = (evento) => {

            /*
               Si se pulsa una flecha,
               no abrimos el producto.
            */

            if (
                evento.target.closest(".flecha")
            ) {

                return;

            }


            /*
               Guardamos el ID del producto
               para que catalogo.js pueda
               abrirlo.
            */

            localStorage.setItem(
                "productoAbrir",
                producto.id
            );


            /*
               Ir al catálogo.
            */

            window.location.href =
                "Pages/catalogo.html";

        };


        /* =================================
           COLORES DEL PRODUCTO
        ================================= */

        let coloresHTML = "";


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


            coloresHTML = `

                <div class="colores-producto">

                    ${producto.colores.map(color => {

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

            `;

        }


        /* =================================
           RUTA DE IMÁGENES
        ================================= */

        /*
           En productos.js las imágenes
           están escritas para catalogo.html:

               ../img/001/001.jpeg

           Como index.html está en la raíz,
           quitamos "../".
        */

        const imagenes =
            producto.imagenes.map(imagen => {

                return imagen.replace(
                    "../",
                    ""
                );

            });


        /* =================================
           HTML DE LA TARJETA
        ================================= */

        tarjeta.innerHTML = `

            <div class="producto-imagenes">

                <img
                    src="${imagenes[0]}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    data-indice="0"
                >


                ${coloresHTML}


                <!-- =========================
                     FLECHA IZQUIERDA
                ========================== -->

                ${
                    imagenes.length > 1
                    ? `

                        <button
                            class="flecha flecha-izquierda"
                            type="button"
                        >

                            <i class="fa-solid fa-chevron-left"></i>

                        </button>

                    `
                    : ""
                }


                <!-- =========================
                     FLECHA DERECHA
                ========================== -->

                ${
                    imagenes.length > 1
                    ? `

                        <button
                            class="flecha flecha-derecha"
                            type="button"
                        >

                            <i class="fa-solid fa-chevron-right"></i>

                        </button>

                    `
                    : ""
                }


                <!-- =========================
                     DATOS DE IMÁGENES
                ========================== -->

                <div
                    class="imagenes-producto-data"
                    data-imagenes='${JSON.stringify(imagenes)}'
                ></div>

            </div>


            <!-- =================================
                 INFORMACIÓN
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


        /* =================================
           FLECHA IZQUIERDA
        ================================= */

        const flechaIzquierda =
            tarjeta.querySelector(
                ".flecha-izquierda"
            );


        if (flechaIzquierda) {

            flechaIzquierda.addEventListener(
                "click",
                (evento) => {

                    evento.stopPropagation();

                    cambiarImagenDestacado(
                        tarjeta,
                        -1
                    );

                }
            );

        }


        /* =================================
           FLECHA DERECHA
        ================================= */

        const flechaDerecha =
            tarjeta.querySelector(
                ".flecha-derecha"
            );


        if (flechaDerecha) {

            flechaDerecha.addEventListener(
                "click",
                (evento) => {

                    evento.stopPropagation();

                    cambiarImagenDestacado(
                        tarjeta,
                        1
                    );

                }
            );

        }


        /* =================================
           AÑADIR TARJETA
        ================================= */

        contenedorDestacados.appendChild(
            tarjeta
        );

    });

}


/* =========================================
   CAMBIAR IMAGEN DE DESTACADO
========================================= */

function cambiarImagenDestacado(
    tarjeta,
    direccion
) {

    const contenedor =
        tarjeta.querySelector(
            ".producto-imagenes"
        );


    const imagenActual =
        contenedor.querySelector(
            ".imagen-producto"
        );


    const datos =
        contenedor.querySelector(
            ".imagenes-producto-data"
        );


    if (
        !contenedor ||
        !imagenActual ||
        !datos
    ) {

        return;

    }


    /* =====================================
       OBTENER IMÁGENES
    ====================================== */

    const imagenes =
        JSON.parse(
            datos.dataset.imagenes
        );


    /*
       Si solo hay una imagen,
       no hacemos nada.
    */

    if (imagenes.length <= 1) {

        return;

    }


    /* =====================================
       EVITAR ANIMACIONES SIMULTÁNEAS
    ====================================== */

    if (
        contenedor.dataset.animando ===
        "true"
    ) {

        return;

    }


    contenedor.dataset.animando =
        "true";


    /* =====================================
       ÍNDICE ACTUAL
    ====================================== */

    let indice =
        parseInt(
            imagenActual.dataset.indice ||
            "0"
        );


    /* =====================================
       NUEVO ÍNDICE
    ====================================== */

    let nuevoIndice =
        indice + direccion;


    if (nuevoIndice < 0) {

        nuevoIndice =
            imagenes.length - 1;

    }


    if (
        nuevoIndice >=
        imagenes.length
    ) {

        nuevoIndice = 0;

    }


    /* =====================================
       CREAR NUEVA IMAGEN
    ====================================== */

    const imagenNueva =
        document.createElement("img");


    imagenNueva.src =
        imagenes[nuevoIndice];


    imagenNueva.alt =
        imagenActual.alt;


    imagenNueva.classList.add(
        "imagen-producto"
    );


    imagenNueva.dataset.indice =
        nuevoIndice;


    /* =====================================
       POSICIÓN INICIAL
    ====================================== */

    if (direccion === 1) {

        imagenNueva.style.transform =
            "translateX(100%)";

    } else {

        imagenNueva.style.transform =
            "translateX(-100%)";

    }


    /* =====================================
       AÑADIR IMAGEN
    ====================================== */

    contenedor.appendChild(
        imagenNueva
    );


    /* =====================================
       FORZAR RENDERIZADO
    ====================================== */

    imagenNueva.offsetWidth;


    /* =====================================
       ANIMACIÓN
    ====================================== */

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


    /* =====================================
       FINALIZAR
    ====================================== */

    setTimeout(() => {

        imagenActual.remove();


        contenedor.dataset.animando =
            "false";

    }, 350);

}


/* =========================================
   PRODUCTOS DESTACADOS
========================================= */

const contenedorDestacados =
    document.getElementById("productos-destacados");


/* =========================================
   COLORES CSS
========================================= */

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


/* =========================================
   VERIFICAR CONTENEDOR
========================================= */

if (contenedorDestacados) {

    contenedorDestacados.innerHTML = "";

    /* =====================================
       TOMAR LOS PRIMEROS 3 PRODUCTOS
    ====================================== */

    const productosDestacados =
        productos.slice(0, 3);


    /* =====================================
       GENERAR TARJETAS
    ====================================== */

    productosDestacados.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add(
            "producto-catalogo"
        );


        /* =================================
           ABRIR PRODUCTO
        ================================== */

        tarjeta.onclick = evento => {

            if (
                evento.target.closest(".flecha") ||
                evento.target.closest(".variantes-producto")
            ) {
                return;
            }

            window.location.href =
                `Pages/catalogo.html?producto=${producto.id}`;

        };


        /* =================================
           SELECTOR DE COLORES
        ================================== */

        const selectorColores =
            producto.colores?.length
            ? `

                <div class="colores-producto">

                    ${producto.colores.map(color => `

                        <span
                            class="color-producto"
                            title="${color.replace("_", " ")}"
                            style="
                                background-color:
                                ${coloresCSS[color] || color};
                            "
                        ></span>

                    `).join("")}

                </div>

            `
            : "";


        /* =================================
           SELECTOR DE TALLAS
        ================================== */

        const selectorTallas =
            producto.tallas?.length
            ? `

                <div class="tallas-producto">

                    ${producto.tallas.map(talla => `

                        <span
                            class="talla-catalogo"
                            title="Talla ${talla}"
                        >${talla}</span>

                    `).join("")}

                </div>

            `
            : "";


        /* =================================
           CONTENIDO DE LA TARJETA
        ================================== */

        tarjeta.innerHTML = `

            <div class="producto-imagenes">

                <img
                    src="${producto.imagenes[0]}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    data-indice="0"
                >

                ${
                    selectorColores || selectorTallas
                    ? `

                        <div class="variantes-producto">

                            ${selectorColores}

                            ${selectorTallas}

                        </div>

                    `
                    : ""
                }

                ${
                    producto.imagenes.length > 1
                    ? `

                        <button
                            type="button"
                            class="flecha flecha-izquierda"
                            onclick="
                                event.stopPropagation();
                                cambiarImagen(this, -1);
                            "
                            aria-label="Imagen anterior"
                        >

                            <i class="fa-solid fa-chevron-left"></i>

                        </button>

                        <button
                            type="button"
                            class="flecha flecha-derecha"
                            onclick="
                                event.stopPropagation();
                                cambiarImagen(this, 1);
                            "
                            aria-label="Imagen siguiente"
                        >

                            <i class="fa-solid fa-chevron-right"></i>

                        </button>

                    `
                    : ""
                }

                <div
                    class="imagenes-producto-data"
                    data-imagenes='${JSON.stringify(producto.imagenes)}'
                ></div>

            </div>

            <div class="producto-datos">

                <h2>
                    ${producto.nombre}
                </h2>

                <div class="producto-precio">

                    $${producto.precio.toFixed(2)}

                </div>

            </div>

        `;


        /* =================================
           AGREGAR AL CONTENEDOR
        ================================== */

        contenedorDestacados.appendChild(
            tarjeta
        );

    });

}


/* =================================
   CARRUSEL DE BANNERS
================================= */

function iniciarCarruselBanners() {

    const slides =
        document.querySelectorAll(".hero-slide");

    const indicadores =
        document.querySelectorAll(".hero-indicador");

    const botonAnterior =
        document.querySelector(".hero-anterior");

    const botonSiguiente =
        document.querySelector(".hero-siguiente");


    /* VERIFICAR ELEMENTOS */

    if (
        !slides.length ||
        !botonAnterior ||
        !botonSiguiente
    ) {
        return;
    }


    /* VARIABLES */

    let bannerActual = 0;
    let intervalo;


    /* =================================
       MOSTRAR BANNER
    ================================== */

    function mostrarBanner(indice) {

        slides.forEach(slide => {
            slide.classList.remove("activo");
        });

        indicadores.forEach(indicador => {
            indicador.classList.remove("activo");
        });


        /* PERMITIR NAVEGACIÓN CIRCULAR */

        bannerActual =
            (indice + slides.length) % slides.length;


        slides[bannerActual].classList.add("activo");


        if (indicadores[bannerActual]) {

            indicadores[bannerActual].classList.add("activo");

        }

    }


    /* =================================
       SIGUIENTE BANNER
    ================================== */

    function siguienteBanner() {

        mostrarBanner(bannerActual + 1);

    }


    /* =================================
       BANNER ANTERIOR
    ================================== */

    function anteriorBanner() {

        mostrarBanner(bannerActual - 1);

    }


    /* =================================
       TEMPORIZADOR
    ================================== */

    function detenerCarrusel() {

        clearInterval(intervalo);

    }


    function iniciarReproduccion() {

        detenerCarrusel();

        intervalo = setInterval(() => {

            siguienteBanner();

        }, 5000);

    }


    /* =================================
       BOTÓN SIGUIENTE
    ================================== */

    botonSiguiente.addEventListener("click", () => {

        siguienteBanner();

        iniciarReproduccion();

    });


    /* =================================
       BOTÓN ANTERIOR
    ================================== */

    botonAnterior.addEventListener("click", () => {

        anteriorBanner();

        iniciarReproduccion();

    });


    /* =================================
       INDICADORES INFERIORES
    ================================== */

    indicadores.forEach((indicador, indice) => {

        indicador.addEventListener("click", () => {

            mostrarBanner(indice);

            iniciarReproduccion();

        });

    });


    /* =================================
       INICIAR AUTOMÁTICAMENTE
    ================================== */

    mostrarBanner(0);

    iniciarReproduccion();

}


/* =========================================
   INICIAR CUANDO EL HTML ESTÉ LISTO
========================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarCarruselBanners
    );

} else {

    iniciarCarruselBanners();

}

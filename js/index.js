/* =========================================
   PRODUCTOS DESTACADOS
========================================= */

const contenedorDestacados =
    document.getElementById("productos-destacados");


/* =========================================
   VERIFICAR CONTENEDOR
========================================= */

if (contenedorDestacados) {

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

        tarjeta.onclick = () => {

            /*
               Usamos la misma función
               del catálogo.
            */

            abrirProducto(producto.id);

        };


        tarjeta.innerHTML = `

            <!-- =============================
                 IMAGEN
            ============================== -->

            <div class="producto-imagenes">

                <img
                    src="${producto.imagenes[0]}"
                    alt="${producto.nombre}"
                    class="imagen-producto"
                    data-indice="0"
                >


                <!-- =========================
                     COLORES
                ========================== -->

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


                <!-- =========================
                     FLECHA IZQUIERDA
                ========================== -->

                ${
                    producto.imagenes.length > 1
                    ? `

                        <button
                            class="flecha flecha-izquierda"
                            onclick="event.stopPropagation(); cambiarImagen(this, -1)"
                        >

                            <i class="fa-solid fa-chevron-left"></i>

                        </button>


                        <!-- =================
                             FLECHA DERECHA
                        ================== -->

                        <button
                            class="flecha flecha-derecha"
                            onclick="event.stopPropagation(); cambiarImagen(this, 1)"
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
                    data-imagenes='${JSON.stringify(producto.imagenes)}'
                >
                </div>

            </div>


            <!-- =============================
                 INFORMACIÓN
            ============================== -->

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
           AGREGAR AL CONTENEDOR
        ================================== */

        contenedorDestacados.appendChild(
            tarjeta
        );

    });

}

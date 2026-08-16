const contenedorDestacados =
    document.getElementById("productos-destacados");


const productosDestacados =
    productos.slice(0, 3);


productosDestacados.forEach(producto => {

    const tarjeta =
        document.createElement("article");

    tarjeta.classList.add("producto");


    tarjeta.innerHTML = `

        <img
            src="${producto.imagenes[0]}"
            alt="${producto.nombre}"
        >

        <div class="producto-info">

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                ${producto.detalles}
            </p>

            <div class="precio">
                $${producto.precio.toFixed(2)}
            </div>

        </div>

    `;


    contenedorDestacados.appendChild(tarjeta);

});

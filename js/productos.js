const productos = [

    // =========================================
    // PRODUCTOS GENERALES
    // =========================================

    {
        id: 3,
        nombre: "Gas Pimienta SABRE Red",
        categoria: "equipamento",
        precio: 30.00,
        detalles: "• Dispositivo de defensa personal con formulación de gas pimienta.<br>• Formato compacto para facilitar su transporte.<br>• Sistema de activación con seguro para reducir activaciones accidentales.",
        imagenes: [
            "../img/003/001.jpeg",
            "../img/003/002.jpeg"
        ]
    },

    {
        id: 4,
        nombre: "Taser con Linterna 928 Type",
        categoria: "equipamento",
        precio: 20.00,
        detalles: "• Dispositivo de defensa personal con descarga eléctrica.<br>• Linterna LED integrada para iluminación en zonas oscuras.<br>• Empuñadura ergonómica para facilitar la sujeción.",
        imagenes: [
            "../img/004/001.jpeg",
            "../img/004/002.jpeg"
        ]
    },

    {
        id: 5,
        nombre: "Tolete Retráctil de Policarbonato",
        categoria: "equipamento",
        precio: 15.00,
        detalles: "• Fabricado en policarbonato resistente.<br>• Diseño retráctil para mantenerlo compacto cuando está plegado.<br>• Mango diseñado para facilitar una sujeción firme.",
        imagenes: [
            "../img/005/001.jpeg",
            "../img/005/002.jpeg"
        ]
    },

    {
        id: 6,
        nombre: "Porta Tolete Retráctil",
        categoria: "equipamento",
        precio: 15.00,
        detalles: "• Funda diseñada para transportar un tolete retráctil.<br>• Sistema de acople ajustable para sujetarse al cinturón.<br>• Fabricado con materiales resistentes para un uso prolongado.",
        imagenes: [
            "../img/006/001.jpeg",
            "../img/006/002.jpeg",
            "../img/006/003.jpeg"
        ]
    },

    {
        id: 11,
        nombre: "Guantes Tácticos Cobra Medio Dedo",
        categoria: "equipamento",
        precio: 10.00,
        detalles: "• Disponible en colores verde y negro.<br>• Diseño de medio dedo para mantener la sensibilidad táctil.<br>• Protecciones reforzadas en los nudillos para mayor protección.",
        colores: ["verde", "negro"],
        imagenes: [
            "../img/011/001.jpeg",
            "../img/011/002.jpeg"
        ]
    },


    // =========================================
    // CORREAS Y CINTURONES
    // =========================================

    {
        id: 1,
        nombre: "Cinturón Táctico Liberación Rápida",
        categoria: "equipamento",
        precio: 30.00,
        detalles: "• Disponible exclusivamente en color negro.<br>• Diseñado para portar equipo de servicio pesado.<br>• Hebilla reforzada de seguridad con sistema de cierre y liberación rápida.",
        imagenes: [
            "../img/001/001.jpeg",
            "../img/001/002.jpeg"
        ]
    },

    {
        id: 2,
        nombre: "Cinturón Táctico Utilitario 10 en 1",
        categoria: "equipamento",
        precio: 30.00,
        detalles: "• Disponible exclusivamente en color negro.<br>• Sistema integral con 10 acoples y estuches desmontables.<br>• Fabricado en nylon reforzado para mayor resistencia y durabilidad.",
        imagenes: [
            "../img/002/001.jpeg",
            "../img/002/002.jpeg"
        ]
    },

    {
        id: 7,
        nombre: "Cinturón Táctico 5.11 Nylon",
        categoria: "equipamento",
        precio: 10.00,
        detalles: "• Disponible en colores verde y negro.<br>• Diseño ultraligero fabricado en cinta de nylon resistente.<br>• Hebilla no metálica de perfil bajo para facilitar el paso por detectores.",
        colores: ["verde", "negro"],
        imagenes: [
            "../img/007/001.jpeg",
            "../img/007/002.jpeg"
        ]
    },

    {
        id: 8,
        nombre: "Cinturón Hebilla Liberación Rápida",
        categoria: "equipamento",
        precio: 20.00,
        detalles: "• Disponible exclusivamente en color verde.<br>• Hebilla metálica con sistema de enganche y liberación rápida.<br>• Estructura rígida diseñada para soportar peso sin deformarse.",
        imagenes: [
            "../img/008/001.jpg",
            "../img/008/002.jpeg"
        ]
    },

    {
        id: 9,
        nombre: "Cinturón 5.11 Hebilla Metálica",
        categoria: "equipamento",
        precio: 10.00,
        detalles: "• Disponible exclusivamente en color verde.<br>• Hebilla metálica fabricada en aleación resistente.<br>• Cinta de nylon diseñada para soportar tensión y uso prolongado.",
        imagenes: [
            "../img/009/001.jpeg"
        ]
    },

    {
        id: 10,
        nombre: "Cinturón Militar 5.11",
        categoria: "equipamento",
        precio: 10.00,
        detalles: "• Disponible exclusivamente en color verde oliva.<br>• Fabricado con materiales resistentes a la humedad y al uso rudo.<br>• Sistema de ajuste firme para mantener el equipo en su posición.",
        imagenes: [
            "../img/010/001.jpeg"
        ]
    },


    // =========================================
    // TECNOLOGÍA
    // =========================================

    {
        id: 12,
        nombre: "Bluetooth Headset YYK-525",
        categoria: "tecnologia",
        precio: 10.00,
        detalles: "• Bluetooth 5.1 para conexión inalámbrica.<br>• Sistema de reducción de ruido para mejorar la claridad del audio.<br>• Micrófono integrado para realizar llamadas.",
        imagenes: [
            "../img/012/001.jpeg",
            "../img/012/002.jpeg",
            "../img/012/003.jpeg"
        ]
    },{
        id: 13,
        nombre: "Audífonos inalámbricos Bluetooth",
        categoria: "tecnologia",
        precio: 25.00,
        colores: ["gris", "rojo"],
        detalles: "• Bluetooth 5.0 para una conexión estable.<br>• Estuche de aluminio en forma de tubo disponible en colores como negro, plateado y rojo.<br>•  Incluyen micrófono incorporado y estuche recargable que permite cargar los audífonos en cualquier lugar..",
        imagenes: [
            "../img/013/001.jpg",
            "../img/013/002.jpg",
            "../img/013/003.jpeg"
        ]
    },{
        id: 14,
        nombre: "TG113 Parlante Portátil Bluetooth",
        categoria: "tecnologia",
        precio: 40.00,
        colores: ["verde", "blanco", "naranja", "negro", "azul"],
        detalles: "• Altavoz inalámbrico cilíndrico, portátil y con diseño resistente al agua.<br>• Cuenta con Bluetooth, puerto USB, ranura para tarjetas microSD, entrada auxiliar de 3.5 mm y radio FM.<br>•  Ofrece una potencia de salida de 5W y batería recargable con autonomía de 3 a 4 horas de reproducción.",
        imagenes: [
            "../img/014/001.jpg",
            "../img/014/002.jpg",
            "../img/014/003.jpg",
            "../img/014/004.jpg",
            "../img/014/005.jpg"
        ]
    },{
        id: 15,
        nombre: "Parlante A011 Pro Max",
        categoria: "tecnologia",
        precio: 30.00,
        colores: ["gris", "verde", "morado", "negro", "rojo"],
        detalles: "• Conectividad inalámbrica por Bluetooth.<br>•  Cuenta con luces LED de colores cambiantes y función de soporte para celular.<br>•   Ofrece potencia de graves mejorados (Super Bass) en un tamaño pequeño.",
        imagenes: [
            "../img/015/001.jpg",
            "../img/015/002.jpg",
            "../img/015/003.jpg",
            "../img/015/004.jpg",
            "../img/015/005.jpg"
        ]
    },{
        id: 16,
        nombre: "Mini Parlante Bluetooth Inalámbrico ",
        categoria: "tecnologia",
        precio: 20.00,
        colores: ["verde", "azul", "rosa"],
        detalles: "• Conectividad Bluetooth integrado para enlace rápido con dispositivos móviles.<br>•  Tamaño de bolsillo, sumamente ligero y portátil, ideal para llevar en la mochila o la mano.<br>•    Recargable mediante cable USB, con una autonomía promedio de 2 a 4 horas dependiendo del volumen.",
        imagenes: [
            "../img/016/001.jpg",
            "../img/016/002.jpg",
            "../img/016/003.jpg"
        ]
    },{
        id: 17,
        nombre: "Jortan - Cámara de Seguridad Inteligente",
        categoria: "hogar",
        precio: 50.00,
        detalles: "• Diseño tipo ampolleta, se enrosca directamente en un soquete estándar E27 como un foco común.<br>•  Funciona mediante red Wi-Fi y es compatible con aplicaciones móviles como YOOSee para control remoto..<br>• Ofrece calidad de imagen Full HD (1080p / 2MP) con movimiento panorámico de 360° y función de visión nocturna por infrarrojos y LEDs",
        imagenes: [
            "../img/017/001.jpg",
            "../img/017/002.jpg"
        ]
    },{
        id: 18,
        nombre: "Colorful Desktop Fan",
        categoria: "hogar",
        precio: 30.00,
        colores: ["verde", "azul", "rosa"],
        detalles: "• Funcionan conectados a tu computadora, monitor o batería portátil. Son los más comunes y eficientes para el escritorio.<br>• Te permiten moverlos libremente sin depender de cables. Su autonomía suele variar entre 2 y 8 horas según la velocidad.<br>• ofrece entre 3 y 4 niveles de potencia controlados por un solo botón o una perilla trasera.",
        imagenes: [
            "../img/018/001.jpg",
            "../img/018/002.jpg",
            "../img/018/003.jpg"
        ]
    },{
        id: 19,
        nombre: "Licuadora Portátil",
        categoria: "camping",
        precio: 20.00,
        detalles: "• Capacidad de 340 ml. <br>• Funciona con batería recargable mediante USB.<br>• Diseñada para preparar batidos, jugos y smoothies de forma inalámbrica.",
        imagenes: [
            "../img/019/001.jpg",
            "../img/019/002.jpg"
        ]
    },{
        id: 20,
        nombre: "Taladro Eléctrico Multifuncional",
        categoria: "hogar",
        precio: 50.00,
        detalles: "• Operado por una batería integrada de 4.2V.<br>• Cuenta con un torque máximo de 5 N·m e incluye 4 marchas o niveles de ajuste de torque.<br>• Equipado con una batería de 2000 mAh recargable mediante un puerto moderno USB Tipo-C.",
        imagenes: [
            "../img/020/001.jpg",
            "../img/020/002.jpg",
            "../img/020/003.jpg"
        ]
    },{
        id: 21,
        nombre: "Purificador de Aire Portátil AeroSafe",
        categoria: "hogar",
        precio: 30.00,
        colores: ["rosa", "negro", "gris"],
        detalles: "• Forma cilíndrica ideal para el portavasos del auto o el escritorio.<br>• Purifica el aire y difunde aromas para refrescar el ambiente.<br>• Acabado metálico elegante, duradero y de estilo moderno.",
        imagenes: [
            "../img/021/001.jpg",
            "../img/021/002.jpg",
            "../img/021/003.jpg",
            "../img/021/004.jpg"
        ]
    },{
        id: 22,
        nombre: "Humidificador Q3",
        categoria: "hogar",
        precio: 25.00,
        detalles: "• Capacidad de 320 ml de agua.<br>• Permite añadir unas gotas de aceite esencial en el depósito para aromatizar estancias pequeñas, dormitorios u oficinas.<br>• Luz ambiental LED con 7 colores cambiantes.",
        imagenes: [
            "../img/022/001.jpg",
            "../img/022/002.jpg"
        ]
    }
];

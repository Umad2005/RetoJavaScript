
// ====== ESTADO DE LA APLICACIÓN ======
const productos = [

    {
        id: 1,
        nombre: "Cuaderno",
        categoria: "Escolar",
        precio: 5000,
        imagen: "img/Cuaderno.png",
        descripcion: "Cuaderno de líneas"
    },

    {
        id: 2,
        nombre: "Lapiz",
        categoria: "Escolar",
        precio: 1000,
        imagen: "img/Lapiz.jpg",
        descripcion: "Lápiz HB"
    },

    {
        id: 3,
        nombre: "Lapicero",
        categoria: "Oficina",
        precio: 2000,
        imagen: "img/Boligrafo.jpg",
        descripcion: "Bolígrafo profesional"
    },

    {
        id: 4,
        nombre: "Resaltador",
        categoria: "Oficina",
        precio: 2500,
        imagen: "img/Resaltador.jpg",
        descripcion: "Resaltador azul"
    },

    {
        id: 5,
        nombre: "Carpeta",
        categoria: "Oficina",
        precio: 4000,
        imagen: "img/Carpeta.jpg",
        descripcion: "Carpeta corporativa"
    },

    {
        id: 6,
        nombre: "Borrador",
        categoria: "Escolar",
        precio: 800,
        imagen: "img/Borrador.png",
        descripcion: "Borrador escolar"
    },

    {
        id: 7,
        nombre: "Regla",
        categoria: "Escolar",
        precio: 1500,
        imagen: "img/Regla.jpg",
        descripcion: "Regla 30cm"
    },

    {
        id: 8,
        nombre: "Tijeras",
        categoria: "Escolar",
        precio: 3000,
        imagen: "img/Tijeras.jpg",
        descripcion: "Tijeras punta roma"
    },

    {
        id: 9,
        nombre: "Marcadores",
        categoria: "Arte",
        precio: 8000,
        imagen: "img/Marcadores.jpg",
        descripcion: "Set x12"
    },

    {
        id: 10,
        nombre: "Pegante",
        categoria: "Escolar",
        precio: 2200,
        imagen: "img/Pegante.png",
        descripcion: "Pegante en barra"
    },

    {
        id: 11,
        nombre: "Cartulina",
        categoria: "Arte",
        precio: 1200,
        imagen: "img/Cartulina.jpg",
        descripcion: "Cartulina blanca"
    },

    {
        id: 12,
        nombre: "Agenda",
        categoria: "Oficina",
        precio: 15000,
        imagen: "img/Agenda.jpg",
        descripcion: "Agenda 2026"
    }

];

let carrito = [];

// DOM
const contenedorProductos = document.getElementById("productContainer");
const contenedorCarrito = document.getElementById("cartContainer");
const totalElemento = document.getElementById("total");
const campoBusqueda = document.getElementById("searchInput");

// Renderizacion de los productos
function renderizarProductos(lista) {
    contenedorProductos.innerHTML = "";

    lista.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card", "fade-in");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button data-id="${producto.id}">Agregar</button>
        `;

        contenedorProductos.appendChild(tarjeta);
    });
}

// Renderizacion del carrito
function renderizarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="empty">El carrito está vacío</p>`;
        totalElemento.textContent = 0;
        return;
    }

    carrito.forEach(item => {
        const contenedorItem = document.createElement("div");
        contenedorItem.classList.add("cart-item");

        contenedorItem.innerHTML = `
            <span>${item.nombre}</span>
            <input type="number" min="1" value="${item.cantidad}" data-id="${item.id}">
            <span>$${item.precio * item.cantidad}</span>
            <button data-id="${item.id}">Eliminar</button>
        `;

        contenedorCarrito.appendChild(contenedorItem);
    });

    actualizarTotal();
}

// Calculamos el total del carrito
function actualizarTotal() {
    const total = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
    totalElemento.textContent = total;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    renderizarCarrito();

    document.querySelector(".cart").classList.add("pulse");

    setTimeout(() => {
        document.querySelector(".cart").classList.remove("pulse");
    }, 400);
}

// Eventos
contenedorProductos.addEventListener("click", evento => {
    if (evento.target.tagName === "BUTTON") {
        const id = parseInt(evento.target.dataset.id);
        agregarAlCarrito(id);
    }
});

contenedorCarrito.addEventListener("input", evento => {
    if (evento.target.type === "number") {
        const id = parseInt(evento.target.dataset.id);
        const item = carrito.find(p => p.id === id);

        if (evento.target.value < 1) {
            evento.target.value = 1;
        }

        item.cantidad = parseInt(evento.target.value);
        renderizarCarrito();
    }
});

contenedorCarrito.addEventListener("click", evento => {
    if (evento.target.tagName === "BUTTON") {
        const id = parseInt(evento.target.dataset.id);
        carrito = carrito.filter(p => p.id !== id);
        renderizarCarrito();
    }
});

// Busqueda de productos
campoBusqueda.addEventListener("input", evento => {
    const texto = evento.target.value.toLowerCase();
    const filtrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(texto)
    );
    renderizarProductos(filtrados);
});

// Iniciamos la aplicación
renderizarProductos(productos);
renderizarCarrito();
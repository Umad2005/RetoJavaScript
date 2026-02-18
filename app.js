// ====== ESTADO ======
const products = [
    { id: 1, name: "Cuaderno", category: "Escolar", price: 5000, image: "img/Cuaderno.png", description: "Cuaderno de lineas" },
    { id: 2, name: "Lápiz", category: "Escolar", price: 1000, image: "img/Lapiz.jpg", description: "Lápiz HB" },
    { id: 3, name: "Bolígrafo", category: "Oficina", price: 2000, image: "img/Boligrafo.jpg", description: "Bolígrafo profesional" },
    { id: 4, name: "Resaltador", category: "Oficina", price: 2500, image: "img/Resaltador.jpg", description: "Resaltador azul" },
    { id: 5, name: "Carpeta", category: "Oficina", price: 4000, image: "img/Carpeta.jpg", description: "Carpeta Corporativa" },
    { id: 6, name: "Borrador", category: "Escolar", price: 800, image: "img/Borrador.png", description: "Borrador Escolar" },
    { id: 7, name: "Regla", category: "Escolar", price: 1500, image: "img/Regla.jpg", description: "Regla 30cm" },
    { id: 8, name: "Tijeras", category: "Escolar", price: 3000, image: "img/Tijeras.jpg", description: "Tijeras punta roma" },
    { id: 9, name: "Marcadores", category: "Arte", price: 8000, image: "img/Marcadores.jpg", description: "Set x12" },
    { id: 10, name: "Pegante", category: "Escolar", price: 2200, image: "img/Pegante.png", description: "Pegante en barra" },
    { id: 11, name: "Cartulina", category: "Arte", price: 1200, image: "img/Cartulina.jpg", description: "Cartulina blanca" },
    { id: 12, name: "Agenda", category: "Oficina", price: 15000, image: "img/Agenda.jpg", description: "Agenda 2026" }
];

let cart = [];

// ====== DOM ======
const productContainer = document.getElementById("productContainer");
const cartContainer = document.getElementById("cartContainer");
const totalSpan = document.getElementById("total");
const searchInput = document.getElementById("searchInput");

// ====== RENDER PRODUCTOS ======
function renderProducts(list) {
    productContainer.innerHTML = "";

    list.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("fade-in"); // ✅ Ahora sí está bien

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button data-id="${product.id}">Agregar</button>
        `;

        productContainer.appendChild(card);
    });
}


// ====== RENDER CARRITO ======
function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty">El carrito está vacío</p>`;
        totalSpan.textContent = 0;
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name}</span>
            <input type="number" min="1" value="${item.quantity}" data-id="${item.id}">
            <span>$${item.price * item.quantity}</span>
            <button data-id="${item.id}">X</button>
        `;

        cartContainer.appendChild(div);
    });

    updateTotal();
}

// ====== TOTAL ======
function updateTotal() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalSpan.textContent = total;
}

// ====== AGREGAR AL CARRITO ======
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();

    // Animación visual del carrito
    document.querySelector(".cart").classList.add("pulse");

    setTimeout(() => {
        document.querySelector(".cart").classList.remove("pulse");
    }, 400);
}


// ====== EVENTOS ======
productContainer.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
    }
});

cartContainer.addEventListener("input", e => {
    if (e.target.type === "number") {
        const id = parseInt(e.target.dataset.id);
        const item = cart.find(p => p.id === id);

        if (e.target.value < 1) {
            e.target.value = 1;
        }

        item.quantity = parseInt(e.target.value);
        renderCart();
    }
});

cartContainer.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.dataset.id);
        cart = cart.filter(p => p.id !== id);
        renderCart();
    }
});

// ====== BUSQUEDA ======
searchInput.addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(text));
    renderProducts(filtered);
});

// ====== INICIALIZACIÓN ======
renderProducts(products);
renderCart();

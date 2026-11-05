// 1. Datos (Estado)
const products = [
    { id: 1, name: 'Teclado Mecánico', price: 89.50, emoji: '⌨️' },
    { id: 2, name: 'Ratón Inalámbrico', price: 35.00, emoji: '🖱️' },
    { id: 3, name: 'Monitor 144Hz', price: 210.00, emoji: '🖥️' },
    { id: 4, name: 'Auriculares', price: 45.99, emoji: '🎧' },
    { id: 5, name: 'Silla Ergonómica', price: 150.00, emoji: '🪑' },
    { id: 6, name: 'Mochila Tech', price: 55.20, emoji: '🎒' }
];

let cart = [];

// 2. Selectores del DOM
const productListEl = document.getElementById('product-list');
const cartListEl = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');

// 3. Inicialización
function init() {
    renderProducts();
}

// 4. Funciones de Renderizado
function renderProducts() {
    productListEl.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-card__emoji">${product.emoji}</div>
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__price">$${product.price.toFixed(2)}</p>
            <button class="product-card__btn" onclick="addToCart(${product.id})">
                Agregar al carrito
            </button>
        </article>
    `).join('');
}

function updateCartUI() {
    // Renderizar lista de items
    if (cart.length === 0) {
        cartListEl.innerHTML = '<p class="cart__empty-msg">El carrito está vacío</p>';
    } else {
        cartListEl.innerHTML = cart.map(item => `
            <li class="cart-item">
                <span class="cart-item__name">${item.emoji} ${item.name}</span>
                <span class="cart-item__price">$${item.price.toFixed(2)}</span>
            </li>
        `).join('');
    }

    // Calcular y renderizar el total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// 5. Lógica de Negocio
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
    }
}

// Arrancar la app
init();
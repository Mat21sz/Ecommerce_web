const products = [
    { id: 1, name: 'Teclado Mecánico Keychron K8', price: 110.00, icon: '⌨️' },
    { id: 2, name: 'Ratón Logitech MX Master 3S', price: 99.50, icon: '🖱️' },
    { id: 3, name: 'Monitor Ultrawide 34" WQHD', price: 450.00, icon: '🖥️' },
    { id: 4, name: 'Auriculares Sony WH-1000XM5', price: 299.99, icon: '🎧' },
    { id: 5, name: 'Silla Ergonómica Herman Miller', price: 850.00, icon: '🪑' },
    { id: 6, name: 'Docking Station USB-C', price: 125.00, icon: '🔌' },
    { id: 7, name: 'SSD NVMe M.2 2TB Gen4', price: 155.00, icon: '💾' },
    { id: 8, name: 'Webcam 4K Ultra HD', price: 180.00, icon: '📷' },
    { id: 9, name: 'Soporte de Aluminio para Laptop', price: 45.00, icon: '💻' },
    { id: 10, name: 'Hub Multiport 8-in-1', price: 35.00, icon: '🔗' }
];

let cart = [];

const productListEl = document.getElementById('product-list');
const cartListEl = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartContainer = document.getElementById('cart-container');
const successMsg = document.getElementById('success-msg');

function init() {
    renderProducts();
    updateCartUI();
}

function renderProducts() {
    productListEl.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-card__icon">${product.icon}</div>
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__price">$${product.price.toFixed(2)}</p>
            <button class="btn btn--outline" onclick="addToCart(${product.id})">
                Añadir al carrito
            </button>
        </article>
    `).join('');
}

function updateCartUI() {
    if (cart.length === 0) {
        cartListEl.innerHTML = '<p class="cart__empty-msg">Tu carrito está vacío.</p>';
        checkoutBtn.disabled = true;
    } else {
        cartListEl.innerHTML = cart.map((item, index) => `
            <li class="cart-item">
                <div class="cart-item__info">
                    <span class="cart-item__name">${item.name}</span>
                    <span class="cart-item__price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="cart__remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
            </li>
        `).join('');
        checkoutBtn.disabled = false;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function processCheckout() {
    if (cart.length === 0) return;

    checkoutBtn.textContent = 'Procesando...';
    checkoutBtn.disabled = true;

    setTimeout(() => {
        cart = [];
        updateCartUI();
        
        cartContainer.classList.add('hidden');
        successMsg.classList.remove('hidden');
        
        checkoutBtn.textContent = 'Completar Compra';
    }, 1500);
}

function resetCart() {

    successMsg.classList.add('hidden');
    cartContainer.classList.remove('hidden');
}


init();
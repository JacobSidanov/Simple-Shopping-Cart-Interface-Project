let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(name, price, quantity) {
    quantity = parseInt(quantity, 10);
    if (!cart[name]) {
        cart[name] = { quantity: 0, price: price };
    }
    cart[name].quantity += quantity;
    updateCart();
}

function removeFromCart(name) {
    delete cart[name];
    updateCart();
}

function updateQuantity(name, quantity) {
    quantity = parseInt(quantity, 10);
    if (quantity < 1) {
        cart[name].quantity = 1;  
    } else {
        cart[name].quantity = quantity;
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = `
        <div class="cart-header">
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
        </div>
    `;

    let total = 0;
    let itemCount = 0;

    Object.keys(cart).forEach(item => {
        const cartEntry = document.createElement('div');
        cartEntry.classList.add('cart-entry');
        const itemSubtotal = (cart[item].price * cart[item].quantity).toFixed(2);
        cartEntry.innerHTML = `
            <span>${item}</span>
            <span>$${cart[item].price.toFixed(2)}</span>
            <input type="number" class="quantity-input" value="${cart[item].quantity}" min="1" onchange="updateQuantity('${item}', this.value)">
            <span>$${itemSubtotal}</span>
            <button onclick="removeFromCart('${item}')">Remove</button>
        `;
        cartItems.appendChild(cartEntry);
        total += parseFloat(itemSubtotal);
        itemCount += cart[item].quantity;
    });

    document.getElementById('item-count').textContent = itemCount;
    document.getElementById('total-price').textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

window.onload = updateCart;

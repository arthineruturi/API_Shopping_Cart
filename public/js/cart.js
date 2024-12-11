// cart.js
export function addToCart(cart, product) {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  return cart;
}

export function updateCartCount(cart, cartCountElement) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

export function updateCartModal(cart, cartItemsContainer, cartTotalPrice) {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalPrice.textContent = "$0.00";
  } else {
    let totalPrice = 0;
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <p>${item.title} x${item.quantity}</p>
        <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });
    cartTotalPrice.textContent = `${totalPrice.toFixed(2)}`;
  }
}

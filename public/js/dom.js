// dom.js
export function getElement(id) {
    return document.getElementById(id);
  }
  
  export function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
  
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>${product.description.substring(0, 100)}...</p>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
    `;
  
    return productCard;
  }
  
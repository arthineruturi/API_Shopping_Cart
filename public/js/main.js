import { getElement } from './dom.js';  
import { fetchProducts, fetchCategories, fetchProductsByCategory } from './api.js';
import { displayProducts, handleSort } from './sort.js';
import { addToCart, updateCartCount, updateCartModal } from './cart.js'; 

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = getElement("products-container");
  const categoriesList = getElement("categories");
  const searchInput = getElement("search");
  const sortSelect = getElement("sort");
  const cartLink = getElement("cart-link");
  const cartCount = getElement("cart-count");
  const cartModal = getElement("cart-modal");
  const cartModalClose = getElement("cart-modal-close");
  const cartItemsContainer = getElement("cart-items-container");
  const cartTotalPrice = getElement("cart-total-price");

  let products = [];
  let cart = [];

  fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const li = document.createElement("li");
      li.textContent = category;
      li.addEventListener("click", () => {
        fetchProductsByCategory(category).then((categoryProducts) => {
          products = categoryProducts;
          displayProducts(products, productsContainer); 
        });
      });
      categoriesList.appendChild(li); 
    });
  });

  fetchProducts().then((allProducts) => {
    products = allProducts;
    displayProducts(products, productsContainer);
    handleSort(products, sortSelect, productsContainer); 
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts, productsContainer); 
  });

  productsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = e.target.dataset.id;
      const productTitle = e.target.dataset.title;
      const productPrice = e.target.dataset.price;
      const product = {
        id: productId,
        title: productTitle,
        price: parseFloat(productPrice),
      };
      cart = addToCart(cart, product);
      updateCartCount(cart, cartCount);
      updateCartModal(cart, cartItemsContainer, cartTotalPrice);
    }
  });


  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.style.display = "flex";
  });

  cartModalClose.addEventListener("click", () => {
    cartModal.style.display = "none"; 
  });
});
let wasOffline = false; 

function updateNetworkStatus(isOnline) {
  const networkStatus = document.getElementById("network-status");
  const statusMessage = document.querySelector(".network-status-message");

  if (isOnline && wasOffline) {
    
    statusMessage.textContent = "You are back online!";
    networkStatus.className = "network-status online visible";

   
    setTimeout(() => {
      networkStatus.classList.remove("visible");
    }, 4000);

    wasOffline = false; 
  } else if (!isOnline) {
    statusMessage.textContent = "You are offline!";
    networkStatus.className = "network-status offline visible";
    wasOffline = true; 
  }
}

window.addEventListener("DOMContentLoaded", () => {
  wasOffline = !navigator.onLine;
});

window.addEventListener("online", () => updateNetworkStatus(true));
window.addEventListener("offline", () => updateNetworkStatus(false));

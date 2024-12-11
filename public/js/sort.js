import { createProductCard } from './dom.js';

export function displayProducts(products, productsContainer) {
  productsContainer.innerHTML = '';

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

export function handleSort(products, sortSelect, productsContainer) {
  sortSelect.addEventListener("change", (event) => {
    const sortValue = event.target.value;
    let sortedProducts = [...products]; // Sort based on products array, not productsContainer

    if (sortValue === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating-desc") {
      sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate); // Corrected comparison
    }

    displayProducts(sortedProducts, productsContainer); // Display the sorted products
  });
}


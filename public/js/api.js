// api.js
export async function fetchCategories() {
    const response = await fetch("/api/categories");
    const data = await response.json();
    return data;
  }
  
  export async function fetchProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }
  
  export async function fetchProductsByCategory(category) {
    const response = await fetch(`/api/products/category/${category}`);
    const data = await response.json();
    return data;
  }
  
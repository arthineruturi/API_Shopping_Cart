const express = require("express");
const axios = require("axios");
const path = require("path");
const NodeCache = require("node-cache");

const app = express();
const PORT = 3000;

const cache = new NodeCache({ stdTTL: 600 });

app.use(express.static(path.join(__dirname, "public")));

function cacheMiddleware(key) {
  return (req, res, next) => {
    const cachedData = cache.get(key);
    if (cachedData) {
      return res.json(cachedData); 
    }
    next();
  };
}

app.get("/api/products", cacheMiddleware("products"), async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    cache.set("products", response.data); // Cache the response
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/categories", cacheMiddleware("categories"), async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/categories");
    cache.set("categories", response.data); // Cache the response
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  const category = req.params.category;
  const cacheKey = `category-${category}`;

  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    cache.set(cacheKey, response.data); // Cache the response
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const API = "https://fakestoreapi.com";
const categories = ["men's clothing", "women's clothing", "jewelery"];

export const fetchProducts = async () => {
  const promises = categories.map(async (category) => {
    const response = await fetch(`${API}/products/category/${category}`);
    if (!response.ok) {
      throw new Error("Błąd podczas ładowania danych");
    }
    return response.json();
  });

  const results = await Promise.all(promises);
  const allProducts = results.flat();

  return allProducts.sort(() => 0.5 - Math.random()).slice(0, 8);
};

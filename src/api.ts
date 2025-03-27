import { Product } from "./components/products/ProductList";
import { useQuery } from "@tanstack/react-query";

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

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await fetch(`${API}/products/category/${category}`);

    if (!response.ok) {
      throw new Error(`Błąd podczas ładowania danych: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Błąd pobierania produktów:", error);
    throw error;
  }
};

export const sendCartToApi = async (
  cartItems: { id: number; quantity: number; size: string }[]
) => {
  try {
    const response = await fetch(`${API}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        date: new Date().toISOString().split("T")[0],
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    });
    if (!response.ok) {
      throw new Error("Błąd podczas wysyłania zamówienia");
    }
    const data = await response.json();
    console.log("Zamówienie wysłane:", data);
    return data;
  } catch (error) {
    console.error("Błąd pobierania produktów:", error);
    throw error;
  }
};

const fetchSingleProduct = async (productId: number) => {
  if (!productId) throw new Error("Repo ID is required");
  try {
    const response = await fetch(`${API}/products/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Fetching error", error);
    throw error;
  }
};

export const useSingleProduct = (productId: number) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
};

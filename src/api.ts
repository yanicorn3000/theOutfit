import { Product } from "./types";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { UserData } from "./routes/user/Register";
import { loginSuccess } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import { getUser } from "./utils";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { LoginData } from "./types";
import { LoginResponse } from "./types";

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

const fetchProductsByCategory = async (
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

const fetchSingleProduct = async (productId: string) => {
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

export const sendCartToApi = async (
  cartItems: { id: number; quantity: number; size: string }[]
) => {
  const userId = getUser()?.id;

  if (!userId) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await fetch(`${API}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Number(userId),
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

const addUserToApi = async (data: UserData) => {
  try {
    const response = await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const result = await response.json();
    return result; // Zwracamy pełne dane użytkownika, w tym ID
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

const fetchUserData = async (userId?: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/users/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Użycie tokenu do autoryzacji
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

//HOOKS

export const useUserData = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSendCart = () => {
  return useMutation({
    mutationFn: sendCartToApi,
    onSuccess: (data) => {
      alert("Cart sent successfully!");
      console.log("Cart response:", data);
    },
    onError: (error) => {
      alert("Error sending cart: " + error.message);
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      const user = getUser();
      dispatch(loginSuccess(user));
    },
    onError: () => {
      alert("Invalid username or password");
    },
  });
};

export const useAddUserToApi = () => {
  const mutation = useMutation({
    mutationFn: addUserToApi,
    onSuccess: (data) => {
      console.log(`User created! ID: ${data.id}`);
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Error creating user");
    },
  });

  return mutation;
};

export const useSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
  });
};

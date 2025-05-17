import { HttpResponse, http } from "msw";
import { LoginData } from "../../routes/user/loginSchema";
import { API } from "../../api";

type CartRequestBody = {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
};

export const handlers = [
  http.post(`${API}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginData;
    const { username, password } = body;

    if (username === "admin" && password === "admin") {
      return HttpResponse.json({
        token: "mock-token",
        user: { id: 1, username: "Admin" },
      });
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  http.get(`${API}/users/:userId`, ({ params }) => {
    const { userId } = params;

    if (userId === "1") {
      return HttpResponse.json({
        id: 1,
        username: "Admin",
        email: "admin@fakestoreapi.com",
        password: "admin123",
        name: {
          firstname: "John",
          lastname: "Doe",
        },
        address: {
          street: "123 Main St",
          city: "Somewhere",
          zipcode: "12926-3874",
          geolocation: {
            lat: "37.7749",
            long: "122.4194",
          },
        },
        phone: "1-570-236-7033",
      });
    }

    return HttpResponse.json({ message: "User not found" }, { status: 404 });
  }),

  http.get(`${API}/products/category/:category`, ({ params }) => {
    const { category } = params;

    return HttpResponse.json([
      {
        id: 1,
        title: "Mock product",
        price: 19.99,
        description: "Sample product",
        category,
        image: "https://via.placeholder.com/150",
        rating: { rate: 4.5, count: 200 },
      },
    ]);
  }),

  http.get(`${API}/products`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Mock product",
        price: 19.99,
        description: "Sample product",
        category: "electronics",
        image: "https://via.placeholder.com/150",
        rating: { rate: 4.5, count: 200 },
      },
      {
        id: 2,
        title: "Another mock product",
        price: 9.99,
        description: "Another sample product",
        category: "jewelery",
        image: "https://via.placeholder.com/150",
        rating: { rate: 3.9, count: 90 },
      },
    ]);
  }),

  http.get(`${API}/products/:productId`, ({ params }) => {
    const { productId } = params;

    if (productId === "error") {
      return new HttpResponse("Internal Server Error", { status: 500 });
    }

    const mockProduct = {
      id: Number(productId),
      title: `Mock Product ${productId}`,
      price: 29.99,
      description: "This is a mocked product description.",
      category: "men's clothing",
      image: "https://via.placeholder.com/150",
      rating: {
        rate: 4.5,
        count: 120,
      },
    };

    return HttpResponse.json(mockProduct);
  }),

  http.post(`${API}/carts`, async ({ request }) => {
    const body = await request.json();
    const { userId, date, products } = body as CartRequestBody;

    if (!userId || !Array.isArray(products)) {
      return HttpResponse.json(
        { message: "Invalid cart data" },
        { status: 400 }
      );
    }
    return HttpResponse.json({
      id: Math.floor(Math.random() * 1000),
      userId,
      date,
      products,
    });
  }),
];

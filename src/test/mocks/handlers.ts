import { HttpResponse, http } from "msw";
import { LoginData } from "../../routes/user/loginSchema";
const API = "https://fakestoreapi.com";

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
          zipcode: "12345",
          geolocation: {
            lat: "37.7749",
            long: "122.4194",
          },
        },
        phone: "+1 123-456-7890",
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
];

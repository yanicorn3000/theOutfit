import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(
    "https://fakestoreapi.com/products/category/:category",
    ({ params }) => {
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
    }
  ),

  http.get("https://fakestoreapi.com/products/:productId", ({ params }) => {
    const { productId } = params;

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

  http.get(
    "https://fakestoreapi.com/products/:productId",
    () => new HttpResponse("Internal Server Error", { status: 500 })
  ),
];

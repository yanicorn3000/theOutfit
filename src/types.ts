export type LoginData = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type ListProps = {
  data: Product[];
  title: string;
};

export type AddToCartProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  selectedSize: string;
  variant?: "primary" | "secondary";
  isError?: boolean;
  setIsError: (isError: boolean) => void;
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string; // api nie obsługuje
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

import { jwtDecode } from "jwt-decode";

const basePath = import.meta.env.BASE_URL;

export function picturePath(path: string) {
  return `${basePath}/assets/images/${path}`;
}

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const data = jwtDecode<{
    sub: number;
    user: string;
    iat: number;
  }>(token);
  return {
    id: data.sub,
    username: data.user,
  };
};

export const getShippingCost = (method: string, subtotal: number): number => {
  switch (method) {
    case "Standard shipping":
      return subtotal > 300 ? 0 : 5;
    case "Express shipping":
      return 15;
    case "Pickup":
      return 0;
    default:
      return 0;
  }
};

let lastOrderId = 0;

export const generateOrderId = (): number => {
  lastOrderId += 1;
  return lastOrderId;
};

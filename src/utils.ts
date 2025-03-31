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

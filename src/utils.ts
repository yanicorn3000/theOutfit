const basePath = import.meta.env.BASE_URL;

export function picturePath(path: string) {
  return `${basePath}/assets/images/${path}`;
}

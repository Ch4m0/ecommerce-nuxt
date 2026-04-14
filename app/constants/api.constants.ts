export const API_ENDPOINTS = {
  products: '/products',
  productById: (id: number) => `/products/${id}`,
  categories: '/products/categories',
  productsByCategory: (category: string) => `/products/category/${category}`,
  carts: '/carts',
} as const

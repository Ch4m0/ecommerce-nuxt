export const APP_NAME = 'Ecommerce Store'

export const ROUTES = {
  home: '/',
  products: '/products',
  productDetail: (id: number) => `/products/${id}`,
  orders: '/orders',
  newOrder: '/orders/new',
} as const

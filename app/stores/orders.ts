import { defineStore } from 'pinia'
import type { Order } from '../pages/orders/_types/order.types'
import type { Product } from '../pages/products/_types/product.types'

interface OrdersState {
  apiOrders: Order[]
  localOrders: Order[]
  productsMap: Record<number, Product>
}

export const useOrdersStore = defineStore('orders', {
  state: (): OrdersState => ({
    apiOrders: [],
    localOrders: [],
    productsMap: {},
  }),

  getters: {
    orders: (state): Order[] => [...state.localOrders, ...state.apiOrders],
    hasOrders: (state): boolean => state.apiOrders.length > 0 || state.localOrders.length > 0,
  },

  actions: {
    setApiOrders(orders: Order[]) {
      this.apiOrders = orders
    },

    addLocalOrder(order: Order) {
      this.localOrders.unshift(order)
    },

    setProductsMap(products: Product[]) {
      this.productsMap = Object.fromEntries(products.map((product) => [product.id, product]))
    },
  },
})

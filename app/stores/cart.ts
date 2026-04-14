import { defineStore } from 'pinia'
import type { CartProduct } from '../pages/orders/_types/order.types'

interface CartItem extends CartProduct {
  title: string
  price: number
  image: string
}

interface CartState {
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(product: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find((item) => item.productId === product.productId)

      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      this.items.push({ ...product, quantity: 1 })
    },

    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.productId !== productId)
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.productId === productId)
      if (!item) return

      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }

      item.quantity = quantity
    },

    clearCart() {
      this.items = []
    },
  },
})

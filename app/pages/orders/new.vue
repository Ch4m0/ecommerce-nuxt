<script setup lang="ts">
import { ChevronLeftIcon, CheckCircleIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'

const cartStore = useCartStore()
const { createOrder } = useOrders()
const { items: cartItems, isEmpty: cartIsEmpty, totalItems: cartItemCount, totalPrice: cartTotalPrice } = storeToRefs(cartStore)
const { clearCart, updateQuantity, removeItem } = cartStore

const isSubmittingOrder = ref(false)
const orderSuccessfullyPlaced = ref(false)

async function placeOrder() {
  if (cartIsEmpty.value) return

  isSubmittingOrder.value = true

  const orderPayload = {
    userId: 1,
    date: new Date().toISOString().split('T')[0],
    products: cartItems.value.map(({ productId, quantity }) => ({ productId, quantity })),
  }

  const createdOrder = await createOrder(orderPayload)

  if (createdOrder) {
    clearCart()
    orderSuccessfullyPlaced.value = true
    setTimeout(() => navigateTo('/orders'), 2000)
  }

  isSubmittingOrder.value = false
}
</script>

<template>
  <div class="space-y-6">
    <NuxtLink to="/orders" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600">
      <ChevronLeftIcon class="h-4 w-4" />
      Volver a órdenes
    </NuxtLink>

    <h1 class="text-2xl font-bold text-gray-900">Nueva Orden</h1>

    <div
      v-if="orderSuccessfullyPlaced"
      class="rounded-lg border border-green-200 bg-green-50 p-6 text-center"
    >
      <CheckCircleIcon class="mx-auto mb-3 h-12 w-12 text-green-500" />
      <h2 class="text-lg font-semibold text-green-800">¡Orden confirmada!</h2>
      <p class="mt-1 text-sm text-green-600">Redirigiendo a tus órdenes...</p>
    </div>

    <template v-else>
      <AppEmptyState
        v-if="cartIsEmpty"
        title="Tu carrito está vacío"
        description="Agrega productos desde el catálogo para crear una orden."
        action-label="Ver productos"
        @action="navigateTo('/products')"
      >
        <template #icon>
          <ShoppingCartIcon class="h-10 w-10 text-gray-400" />
        </template>
      </AppEmptyState>

      <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <AppCard padding="none">
            <div class="border-b border-gray-100 px-5 py-4">
              <h2 class="font-semibold text-gray-900">
                Productos en tu carrito
                <span class="ml-1 text-sm font-normal text-gray-500">({{ cartItemCount }})</span>
              </h2>
            </div>

            <div class="divide-y divide-gray-100 px-5">
              <OrderCartItem
                v-for="cartItem in cartItems"
                :key="cartItem.productId"
                :item="cartItem"
                @increase-quantity="updateQuantity(cartItem.productId, cartItem.quantity + 1)"
                @decrease-quantity="updateQuantity(cartItem.productId, cartItem.quantity - 1)"
                @remove-item="removeItem(cartItem.productId)"
              />
            </div>
          </AppCard>
        </div>

        <div>
          <OrderSummary
            :total-items="cartItemCount"
            :total-price="cartTotalPrice"
            :is-submitting="isSubmittingOrder"
            @place-order="placeOrder"
          />
        </div>
      </div>
    </template>
  </div>
</template>

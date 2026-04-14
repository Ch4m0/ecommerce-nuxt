<script setup lang="ts">
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const { item } = defineProps<{
  item: {
    productId: number
    title: string
    price: number
    image: string
    quantity: number
  }
}>()
const {
  productId: cartItemProductId,
  title: cartItemTitle,
  price: cartItemUnitPrice,
  image: cartItemImage,
  quantity: cartItemQuantity,
} = toRefs(item)

const emit = defineEmits<{
  increaseQuantity: [productIdToIncrease: number]
  decreaseQuantity: [productIdToDecrease: number]
  removeItem: [productIdToRemove: number]
}>()

const formattedUnitPrice = computed(() => formatCurrency(cartItemUnitPrice.value))
const formattedSubtotal = computed(() => formatCurrency(cartItemUnitPrice.value * cartItemQuantity.value))
</script>

<template>
  <div class="flex items-center gap-4 py-4">
    <img
      :src="cartItemImage"
      :alt="cartItemTitle"
      class="h-16 w-16 shrink-0 rounded-lg bg-gray-50 object-contain p-1"
    />

    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <p class="truncate text-sm font-medium text-gray-900">{{ cartItemTitle }}</p>
      <p class="text-xs text-gray-500">{{ formattedUnitPrice }} por unidad</p>
    </div>

    <div class="flex shrink-0 items-center gap-2">
      <button
        class="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-600"
        @click="emit('decreaseQuantity', cartItemProductId)"
      >
        <MinusIcon class="h-3 w-3" />
      </button>

      <span class="w-6 text-center text-sm font-semibold text-gray-900">{{ cartItemQuantity }}</span>

      <button
        class="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-600"
        @click="emit('increaseQuantity', cartItemProductId)"
      >
        <PlusIcon class="h-3 w-3" />
      </button>
    </div>

    <p class="w-20 shrink-0 text-right text-sm font-semibold text-gray-900">{{ formattedSubtotal }}</p>

    <button
      class="shrink-0 text-gray-400 transition-colors hover:text-red-500"
      @click="emit('removeItem', cartItemProductId)"
    >
      <XMarkIcon class="h-4 w-4" />
    </button>
  </div>
</template>

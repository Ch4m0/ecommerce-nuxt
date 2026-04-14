<script setup lang="ts">
import { PlusIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/20/solid'
import type { Product } from '../_types/product.types'

const props = defineProps<{ product: Product }>()
const { product } = toRefs(props)
const {
  id: productId,
  title: productTitle,
  price: productPrice,
  image: productImage,
  category: productCategory,
  rating: productRating,
} = toRefs(product.value)

const cartStore = useCartStore()
const { addItem } = cartStore
const justAddedToCart = ref(false)

const formattedPrice = computed(() => formatCurrency(productPrice.value))
const productRatingCount = computed(() => productRating.value.count)
const { starColorClass } = useProductRating(productRating.value.rate)

const addToCartButtonVariant = computed(() => justAddedToCart.value ? 'secondary' : 'primary')
const addToCartButtonLabel = computed(() => justAddedToCart.value ? 'Agregado' : 'Agregar')

function addToCart() {
  addItem({
    productId: productId.value,
    title: productTitle.value,
    price: productPrice.value,
    image: productImage.value,
  })

  justAddedToCart.value = true
  setTimeout(() => { justAddedToCart.value = false }, 1500)
}
</script>

<template>
  <AppCard :hover="true" padding="none" class="flex flex-col overflow-hidden">
    <NuxtLink :to="`/products/${productId}`" class="block">
      <div class="relative overflow-hidden bg-gray-50 p-6">
        <img
          :src="productImage"
          :alt="productTitle"
          class="mx-auto h-48 w-full object-contain transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <AppBadge variant="info" class="absolute left-3 top-3 capitalize">
          {{ productCategory }}
        </AppBadge>
      </div>
    </NuxtLink>

    <div class="flex flex-1 flex-col p-4">
      <NuxtLink :to="`/products/${productId}`">
        <h3 class="mb-1 line-clamp-2 text-sm font-medium text-gray-900 hover:text-primary-600">
          {{ productTitle }}
        </h3>
      </NuxtLink>

      <div class="mb-3 flex items-center gap-1">
        <StarIcon
          v-for="ratingStarPosition in 5"
          :key="ratingStarPosition"
          :class="['h-3.5 w-3.5', starColorClass(ratingStarPosition)]"
        />
        <span class="text-xs text-gray-500">({{ productRatingCount }})</span>
      </div>

      <div class="mt-auto flex items-center justify-between">
        <span class="text-lg font-bold text-gray-900">{{ formattedPrice }}</span>

        <AppButton :variant="addToCartButtonVariant" size="sm" @click="addToCart">
          <CheckIcon v-if="justAddedToCart" class="h-4 w-4" />
          <PlusIcon v-else class="h-4 w-4" />
          {{ addToCartButtonLabel }}
        </AppButton>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, MinusIcon, PlusIcon, ShoppingCartIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const cartStore = useCartStore()
const { fetchProductById } = useProducts()

const productId = Number(route.params.id)
const selectedQuantity = ref(1)
const justAddedToCart = ref(false)

const { data: product } = await useAsyncData(
  `product-${productId}`,
  () => fetchProductById(productId),
)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado' })
}

const {
  id,
  title,
  price,
  image,
  category,
  description,
  rating,
} = product.value

const formattedPrice = computed(() => formatCurrency(price))
const formattedSubtotal = computed(() => formatCurrency(price * selectedQuantity.value))

const { starColorClass } = useProductRating(rating.rate)

const addToCartButtonVariant = computed(() => justAddedToCart.value ? 'secondary' : 'primary')
const addToCartButtonLabel = computed(() => justAddedToCart.value ? '¡Agregado!' : 'Agregar al carrito')
const canDecreaseQuantity = computed(() => selectedQuantity.value > 1)

function increaseQuantity() {
  selectedQuantity.value += 1
}

function decreaseQuantity() {
  if (!canDecreaseQuantity.value) return
  selectedQuantity.value -= 1
}

function addToCart() {
  for (let i = 0; i < selectedQuantity.value; i++) {
    cartStore.addItem({
      productId: id,
      title,
      price,
      image,
    })
  }

  justAddedToCart.value = true
  setTimeout(() => { justAddedToCart.value = false }, 800)
}

useHead({ title })
</script>

<template>
  <div class="space-y-6">
    <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600">
      <ChevronLeftIcon class="h-4 w-4" />
      Volver a productos
    </NuxtLink>

    <AppCard padding="lg">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div class="flex items-center justify-center rounded-xl bg-gray-50 p-8">
          <img :src="image" :alt="title" class="max-h-80 w-full object-contain" />
        </div>

        <div class="flex flex-col gap-4">
          <AppBadge variant="info" class="w-fit capitalize">
            {{ category }}
          </AppBadge>

          <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>

          <div class="flex items-center gap-2">
            <div class="flex items-center gap-0.5">
              <StarIcon
                v-for="starPosition in 5"
                :key="starPosition"
                :class="['h-5 w-5', starColorClass(starPosition)]"
              />
            </div>
            <span class="text-sm font-medium text-gray-700">{{ rating.rate }}</span>
            <span class="text-sm text-gray-400">({{ rating.count }} reseñas)</span>
          </div>

          <p class="text-3xl font-bold text-primary-600">{{ formattedPrice }}</p>

          <p class="leading-relaxed text-gray-600">{{ description }}</p>

          <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <span class="text-sm font-medium text-gray-700">Cantidad:</span>

            <div class="flex items-center gap-3">
              <button
                :class="[
                  'flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                  canDecreaseQuantity
                    ? 'border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed',
                ]"
                :disabled="!canDecreaseQuantity"
                @click="decreaseQuantity"
              >
                <MinusIcon class="h-4 w-4" />
              </button>

              <span class="w-8 text-center text-lg font-bold text-gray-900">{{ selectedQuantity }}</span>

              <button
                class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-600"
                @click="increaseQuantity"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
            </div>

            <span class="ml-auto text-sm font-semibold text-gray-700">
              Subtotal: {{ formattedSubtotal }}
            </span>
          </div>

          <AppButton :variant="addToCartButtonVariant" size="lg" class="w-full" @click="addToCart">
            <CheckIcon v-if="justAddedToCart" class="h-5 w-5" />
            <ShoppingCartIcon v-else class="h-5 w-5" />
            {{ addToCartButtonLabel }}
          </AppButton>
        </div>
      </div>
    </AppCard>
  </div>
</template>

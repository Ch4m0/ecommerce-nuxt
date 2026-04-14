<script setup lang="ts">
import type { Product } from '../_types/product.types'

defineProps<{ products: Product[] }>()

const SKELETON_COUNT = 8
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <slot name="loading">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </slot>
  </div>
</template>

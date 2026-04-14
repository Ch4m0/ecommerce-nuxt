<script setup lang="ts">
import type { ProductCategory } from '../_types/product.types'

const { categories, activeCategory } = defineProps<{
  categories: ProductCategory[]
  activeCategory: ProductCategory | null
}>()

const emit = defineEmits<{
  select: [category: ProductCategory | null]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      :class="[
        'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
        activeCategory === null
          ? 'border-primary-600 bg-primary-600 text-white'
          : 'border-gray-300 bg-white text-gray-600 hover:border-primary-400 hover:text-primary-600',
      ]"
      @click="emit('select', null)"
    >
      Todos
    </button>

    <button
      v-for="category in categories"
      :key="category"
      :class="[
        'rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors',
        activeCategory === category
          ? 'border-primary-600 bg-primary-600 text-white'
          : 'border-gray-300 bg-white text-gray-600 hover:border-primary-400 hover:text-primary-600',
      ]"
      @click="emit('select', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { products, categories, activeCategory, fetchProducts, fetchCategories, selectCategory } = useProducts()

const SKELETON_PLACEHOLDER_COUNT = 8
const PRODUCTS_FETCH_ERROR_MESSAGE = 'No se pudieron cargar los productos. Intenta de nuevo.'

await useAsyncData('categories', fetchCategories)

const { pending: isLoadingProducts, error: productsFetchError, refresh: refreshProducts } = await useAsyncData(
  'products',
  fetchProducts,
)

watch(activeCategory, () => refreshProducts())

function onCategorySelect(category: Parameters<typeof selectCategory>[0]) {
  selectCategory(category)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Productos</h1>
      <p class="mt-1 text-sm text-gray-500">{{ products.length }} productos encontrados</p>
    </div>

    <ProductFilters
      :categories="categories"
      :active-category="activeCategory"
      @select="onCategorySelect"
    />

    <AppErrorAlert
      v-if="productsFetchError"
      :message="PRODUCTS_FETCH_ERROR_MESSAGE"
      retry-label="Reintentar"
      @retry="refreshProducts"
    />

    <template v-else>
      <div v-if="isLoadingProducts" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCardSkeleton v-for="n in SKELETON_PLACEHOLDER_COUNT" :key="n" />
      </div>

      <template v-else>
        <AppEmptyState
          v-if="products.length === 0"
          title="Sin productos"
          description="No se encontraron productos para la categoría seleccionada."
          action-label="Ver todos"
          @action="onCategorySelect(null)"
        />

        <ProductGrid v-else :products="products" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '../_types/order.types'

const { order } = defineProps<{ order: Order }>()

const { productsMap } = useOrders()

const formattedDate = computed(() => formatDate(order.date))

const totalProductCount = computed(() =>
  order.products.reduce((total, item) => total + item.quantity, 0)
)

const orderLabel = computed(() => `Orden #${order.id}`)
const userLabel = computed(() => `Usuario #${order.userId}`)
const productCountLabel = computed(() =>
  totalProductCount.value === 1 ? '1 producto' : `${totalProductCount.value} productos`
)
</script>

<template>
  <AppCard :hover="true" padding="md">
    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2">
          <h3 class="font-semibold text-gray-900">{{ orderLabel }}</h3>
          <AppBadge variant="success">Completada</AppBadge>
        </div>
        <p class="text-sm text-gray-500">{{ formattedDate }}</p>
        <p class="text-xs text-gray-400">{{ userLabel }}</p>
      </div>

      <div class="flex flex-col items-end gap-2">
        <AppBadge variant="info">{{ productCountLabel }}</AppBadge>
        <div class="flex flex-wrap justify-end gap-1">
          <span
            v-for="item in order.products"
            :key="item.productId"
            class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
          >
            {{ productsMap[item.productId]?.title ?? `Producto #${item.productId}` }} × {{ item.quantity }}
          </span>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

const ORDERS_FETCH_ERROR_MESSAGE = 'No se pudieron cargar las órdenes. Intenta de nuevo.'

const { orders, hasOrders, fetchOrders } = useOrders()

const { pending: isLoadingOrders, error: ordersFetchError, refresh: refreshOrders } = await useAsyncData(
  'orders',
  fetchOrders,
)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Mis Órdenes</h1>
        <p class="mt-1 text-sm text-gray-500">Historial de todas tus compras</p>
      </div>

      <NuxtLink to="/orders/new">
        <AppButton variant="primary">
          <PlusIcon class="h-4 w-4" />
          Nueva orden
        </AppButton>
      </NuxtLink>
    </div>

    <AppErrorAlert
      v-if="ordersFetchError"
      :message="ORDERS_FETCH_ERROR_MESSAGE"
      retry-label="Reintentar"
      @retry="refreshOrders"
    />

    <div v-else-if="isLoadingOrders" class="space-y-3">
      <div
        v-for="n in 5"
        :key="n"
        class="h-24 animate-pulse rounded-xl border border-gray-100 bg-white"
      />
    </div>

    <template v-else>
      <AppEmptyState
        v-if="!hasOrders"
        title="Sin órdenes aún"
        description="Explora nuestro catálogo y realiza tu primera compra."
        action-label="Ver productos"
        @action="navigateTo('/products')"
      >
        <template #icon>
          <ClipboardDocumentListIcon class="h-10 w-10 text-gray-400" />
        </template>
      </AppEmptyState>

      <div v-else class="space-y-3">
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
        />
      </div>
    </template>
  </div>
</template>

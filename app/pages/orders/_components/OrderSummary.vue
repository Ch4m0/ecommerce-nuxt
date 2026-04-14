<script setup lang="ts">
interface Props {
  totalItems: number
  totalPrice: number
  isSubmitting: boolean
}

const { totalItems, totalPrice, isSubmitting } = defineProps<Props>()

const emit = defineEmits<{ placeOrder: [] }>()

const formattedTotal = computed(() => formatCurrency(totalPrice))

const itemsLabel = computed(() =>
  totalItems === 1 ? '1 producto' : `${totalItems} productos`
)
</script>

<template>
  <AppCard padding="md" class="sticky top-24">
    <h2 class="mb-4 text-lg font-semibold text-gray-900">Resumen de orden</h2>

    <div class="space-y-3 border-b border-gray-100 pb-4">
      <div class="flex justify-between text-sm text-gray-600">
        <span>Subtotal ({{ itemsLabel }})</span>
        <span>{{ formattedTotal }}</span>
      </div>
      <div class="flex justify-between text-sm text-gray-600">
        <span>Envío</span>
        <span class="text-green-600 font-medium">Gratis</span>
      </div>
    </div>

    <div class="flex justify-between pt-4 text-base font-bold text-gray-900">
      <span>Total</span>
      <span>{{ formattedTotal }}</span>
    </div>

    <AppButton
      variant="primary"
      size="lg"
      class="mt-6 w-full"
      :loading="isSubmitting"
      :disabled="totalItems === 0"
      @click="emit('placeOrder')"
    >
      Confirmar orden
    </AppButton>

    <NuxtLink to="/products">
      <AppButton variant="ghost" size="md" class="mt-2 w-full">
        Seguir comprando
      </AppButton>
    </NuxtLink>
  </AppCard>
</template>

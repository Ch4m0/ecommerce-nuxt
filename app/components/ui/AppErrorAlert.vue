<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
  message: string
  retryLabel?: string
}

defineProps<Props>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="rounded-lg border border-red-200 bg-red-50 p-4">
    <div class="flex items-start gap-3">
      <ExclamationCircleIcon class="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

      <div class="flex-1">
        <p class="text-sm font-medium text-red-800">{{ message }}</p>
      </div>

      <AppButton
        v-if="retryLabel"
        variant="ghost"
        size="sm"
        class="shrink-0 !text-red-600 hover:!bg-red-100"
        @click="$emit('retry')"
      >
        {{ retryLabel }}
      </AppButton>
    </div>
  </div>
</template>

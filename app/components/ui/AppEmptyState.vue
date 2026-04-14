<script setup lang="ts">
import { ArchiveBoxIcon } from '@heroicons/vue/24/outline'

interface Props {
  title: string
  description?: string
  actionLabel?: string
}

defineProps<Props>()
defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <div class="mb-4 rounded-full bg-gray-100 p-5">
      <slot name="icon">
        <ArchiveBoxIcon class="h-10 w-10 text-gray-400" />
      </slot>
    </div>

    <h3 class="mb-1 text-lg font-semibold text-gray-900">{{ title }}</h3>

    <p v-if="description" class="mb-6 max-w-sm text-sm text-gray-500">
      {{ description }}
    </p>

    <AppButton v-if="actionLabel" @click="$emit('action')">
      {{ actionLabel }}
    </AppButton>
  </div>
</template>

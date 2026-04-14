<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
  ghost:     'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
  'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  variantClasses[props.variant],
  sizeClasses[props.size],
  (props.disabled || props.loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
])
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClasses">
    <ArrowPathIcon v-if="loading" class="h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>

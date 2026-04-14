<script setup lang="ts">
interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: 'md',
})

const paddingClasses = {
  none: '',
  sm:   'p-3',
  md:   'p-5',
  lg:   'p-8',
}

const cardClasses = computed(() => [
  'bg-white rounded-xl border border-gray-100 shadow-sm',
  paddingClasses[props.padding],
  props.hover ? 'transition-shadow duration-200 hover:shadow-md cursor-pointer' : '',
])
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

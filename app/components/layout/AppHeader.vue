<script setup lang="ts">
import { ShoppingBagIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ROUTES, APP_NAME } from '~/constants/app.constants'

const cartStore = useCartStore()
const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Productos', to: ROUTES.products },
  { label: 'Órdenes', to: ROUTES.orders },
]

const cartHasItems = computed(() => cartStore.totalItems > 0)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <NuxtLink :to="ROUTES.home" class="flex items-center gap-2">
          <ShoppingBagIcon class="h-7 w-7 text-primary-600" />
          <span class="text-lg font-bold text-gray-900">{{ APP_NAME }}</span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            active-class="bg-primary-50 text-primary-700"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink :to="ROUTES.newOrder" class="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
            <ShoppingCartIcon class="h-5 w-5" />
            <Transition name="badge">
              <span
                v-if="cartHasItems"
                class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white"
              >
                {{ cartStore.totalItems }}
              </span>
            </Transition>
          </NuxtLink>

          <button
            class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Bars3Icon v-if="!isMenuOpen" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav v-if="isMenuOpen" class="border-t border-gray-100 pb-3 pt-2 md:hidden">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          active-class="bg-primary-50 text-primary-700"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.badge-enter-active,
.badge-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.badge-enter-from,
.badge-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>

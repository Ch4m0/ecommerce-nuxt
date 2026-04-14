export function useProductRating(ratingRate: number) {
  const filledStarsCount = computed(() => Math.round(ratingRate))

  function starColorClass(starPosition: number) {
    return starPosition <= filledStarsCount.value ? 'text-yellow-400' : 'text-gray-200'
  }

  return { filledStarsCount, starColorClass }
}

import { API_ENDPOINTS } from '~/constants/api.constants'
import type { Product, ProductCategory } from '../_types/product.types'

export function useProducts() {
  const { get } = useApi()

  const products = useState<Product[]>('products', () => [])
  const categories = useState<ProductCategory[]>('categories', () => [])
  const activeCategory = useState<ProductCategory | null>('activeCategory', () => null)

  async function fetchProducts() {
    const endpoint = activeCategory.value
      ? API_ENDPOINTS.productsByCategory(activeCategory.value)
      : API_ENDPOINTS.products

    products.value = await get<Product[]>(endpoint)
  }

  async function fetchCategories() {
    categories.value = await get<ProductCategory[]>(API_ENDPOINTS.categories)
  }

  async function fetchProductById(id: number) {
    return await get<Product>(API_ENDPOINTS.productById(id))
  }

  function selectCategory(category: ProductCategory | null) {
    activeCategory.value = category
  }

  return {
    products,
    categories,
    activeCategory,
    fetchProducts,
    fetchCategories,
    fetchProductById,
    selectCategory,
  }
}

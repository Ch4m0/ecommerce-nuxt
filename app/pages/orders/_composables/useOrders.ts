import { API_ENDPOINTS } from '~/constants/api.constants'
import type { Order, CreateOrderPayload } from '../_types/order.types'
import type { Product } from '../../products/_types/product.types'

export function useOrders() {
  const { get, post } = useApi()

  const ordersStore = useOrdersStore()
  const { orders, hasOrders, productsMap } = storeToRefs(ordersStore)
  const { setApiOrders, addLocalOrder, setProductsMap } = ordersStore

  async function fetchOrders() {
    const fetchedOrders = await get<Order[]>(API_ENDPOINTS.carts)
    setApiOrders(fetchedOrders)

    const uniqueProductIds = [
      ...new Set(fetchedOrders.flatMap((order) => order.products.map((item) => item.productId))),
    ]

    const fetchedProducts = await Promise.all(
      uniqueProductIds.map((id) => get<Product>(API_ENDPOINTS.productById(id))),
    )

    setProductsMap(fetchedProducts)
  }

  async function createOrder(payload: CreateOrderPayload) {
    const newOrder = await post<Order>(
      API_ENDPOINTS.carts,
      payload as unknown as Record<string, unknown>,
    )
    addLocalOrder(newOrder)
    return newOrder
  }

  return {
    orders,
    hasOrders,
    productsMap,
    fetchOrders,
    createOrder,
  }
}

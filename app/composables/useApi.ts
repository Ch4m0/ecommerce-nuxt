export function useApi() {
  const { public: { apiBaseUrl } } = useRuntimeConfig()

  async function get<T>(endpoint: string): Promise<T> {
    return $fetch<T>(`${apiBaseUrl}${endpoint}`)
  }

  async function post<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    return $fetch<T>(`${apiBaseUrl}${endpoint}`, {
      method: 'POST',
      body,
    })
  }

  return { get, post }
}

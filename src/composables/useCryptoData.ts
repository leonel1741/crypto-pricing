import { inject } from 'vue'
import { useCoinListStore } from '../stores/coinListStore'
import { useLoadingStore } from '../stores/loadingStore'
import { useErrorStore } from '../stores/errorStore'

export const useCryptoData = () => {
  const coinListStore = useCoinListStore()
  const loadingStore = useLoadingStore()
  const errorStore = useErrorStore()

  type HttpFunction = (url: string, config?: any) => Promise<any>

  const http = inject('http') as HttpFunction

  const fetchCoins = async (url:string) => {
    const key = 'coins'

    if (!http) {
      errorStore.setError('http', 'HTTP client no disponible')
      return
    }

    try {
      loadingStore.setLoading(key, true)
      errorStore.setError(key, null)

      const response = await http(url)

      coinListStore.setCoins(response)

    } catch (error) {
      errorStore.setError(key, 'Error al obtener datos')
      console.error(error)
    } finally {
      loadingStore.setLoading(key, false)
    }
  }

  return {
    fetchCoins,
    coins: coinListStore.coins,
    isLoadingCoins: () => loadingStore.isLoading('coins'),
    error: () => errorStore.getError('coins'),
  }
}

import { computed, inject } from 'vue'
import { useCoinListStore } from '../stores/coinListStore'
import { useLoadingStore } from '../stores/loadingStore'
import { useErrorStore } from '../stores/errorStore'
import { useCoinDetailStore } from '@/stores/coinDetailStore'

export const useCryptoData = () => {
  const coinListStore = useCoinListStore()
  const coinDetailStore = useCoinDetailStore()
  const loadingStore = useLoadingStore()
  const errorStore = useErrorStore()

  type HttpFunction = (url: string, config?: any) => Promise<any>

  const http = inject('http') as HttpFunction

  const fetchCoins = async (url:string) => {
    const key = 'cryptos'

    if (!http) {
      errorStore.setError('http', 'HTTP client no disponible')
      return
    }

    try {
      loadingStore.setLoading(key, true)
      errorStore.setError(key, null)

      const response = await http(url)

      coinListStore.clearCoins()
      coinListStore.setCoins(response)

    } catch (error) {
      errorStore.setError(key, 'Error al obtener datos')
      console.error(error)
    } finally {
      loadingStore.setLoading(key, false)
    }
  }

  const fetchCoinDetail = async (url:string) => {
    const key = 'crypto'

    if (!http) {
      errorStore.setError('http', 'HTTP client no disponible')
      return
    }

    try {
      loadingStore.setLoading(key, true)
      errorStore.setError(key, null)

      const response = await http(url)

      coinDetailStore.clearCoin()
      coinDetailStore.setCoin(response[0])

    } catch (error) {
      errorStore.setError(key, 'Error al obtener datos')
      console.error(error)
    } finally {
      loadingStore.setLoading(key, false)
    }
  }

  return {
    fetchCoins,
    fetchCoinDetail,
    coins: coinListStore.coins,
    coin: computed(() => coinDetailStore.selectedCoin),
    isLoadingCoins: (key:string) => loadingStore.isLoading(key),
    getError: (key:string) => errorStore.getError(key),
  }
}

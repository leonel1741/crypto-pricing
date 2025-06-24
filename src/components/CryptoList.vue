<template>
  <div class="container py-1">
    <div class="d-flex justify-content-between pb-2">
      <h2 class="mb-2">Lista de Criptomonedas (en Bolivianos)</h2>
      <button class="btn btn-primary " @click="updateList">Volver a la lista</button>
    </div>

    <div class="mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Buscar moneda por nombre o símbolo"
      />
    </div>

    <LoadingSpinner v-if="loading" />

    <!-- Lista de Criptomonedas -->
    <div
      v-else
      class="d-flex align-items-center justify-content-between bg-light p-1 rounded mb-3 shadow-sm cursor-pointer"
      v-for="coin in paginatedCoins"
      :key="coin.id"
      @click="goToCoin(coin)"
    >
      <!-- Imagen y nombre -->
      <div class="d-flex align-items-center gap-2">
        <img :src="coin.image" :alt="coin.name" width="32" height="32" />

        <div>
          <div class="fw-bold">{{ coin.name }}</div>

          <small class="text-muted">{{ coin.symbol.toUpperCase() }}</small>
        </div>
      </div>

      <!-- Precio -->
      <div class="text-end">
        <div class="fw-semibold">
          Bs {{ (coin.current_price * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
        </div>

        <div
          :class="[
            'small fw-bold d-flex align-items-center gap-1 justify-content-end',
            coin.price_change_percentage_24h > 0
              ? 'text-success'
              : coin.price_change_percentage_24h < 0
              ? 'text-danger'
              : 'text-dark'
          ]"
        >
          <span v-if="coin.price_change_percentage_24h > 0">
            <i class="bi bi-arrow-up" aria-hidden="true"></i>
          </span>

          <span v-else-if="coin.price_change_percentage_24h < 0">
            <i class="bi bi-arrow-down" aria-hidden="true"></i>
          </span>

          <span v-else></span>
          {{ coin.price_change_percentage_24h.toFixed(2) }} %
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-if="!filteredCoins.length && search" class="text-center text-muted mt-4">
    No se encontraron monedas con ese nombre o símbolo.
    </div>

    <!-- Paginación -->
    <nav v-if="totalPages > 1" class="mt-1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)">Anterior</button>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup lang="ts">
  import LoadingSpinner from "./LoadingSpinner.vue";
  import { useCoinDetailStore } from "../stores/coinDetailStore";
  import { computed, inject, onMounted, ref } from "vue";
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const coinDetailStore = useCoinDetailStore()

  interface Coin {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: number
    ath_change_percentage: number
    ath_date: Date
    atl: number
    atl_change_percentage: number
    atl_date: Date
    roi: null
    last_updated: Date
  }

  const http = inject<((url: string) => Promise<any>)>('http')

  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

  const loading = ref(true)

  const typeChange = 6.96
  const coinList = ref<Coin[]>([])
  const search = ref('')

  const currentPage = ref(1)
  const itemsPerPage = 10

  const getCoinsList = async() => {
    try {
      if (http) {
        loading.value = true
        const data = await http(url)
        coinList.value = data
        }
    } catch (error) {
      console.error('Error fetching coins:', error)
      router.push(`/error-page`)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await getCoinsList()
  })

  const filteredCoins = computed(() => {
    return coinList.value.filter((coin) => {
      const text = search.value.toLowerCase()
      currentPage.value = 1
      return (
        coin.name.toLowerCase().includes(text) ||
        coin.symbol.toLowerCase().includes(text)
      )
    })
  })

  const goToCoin = (coin:Coin) => {
    coinDetailStore.setCoin(coin)
    router.push(`/coin/${coin.id}`)
  }

  const updateList = async() => {
    await getCoinsList()
    search.value = ''
  }

  const totalPages = computed(() => {
    return Math.ceil(filteredCoins.value.length / itemsPerPage)
  })

  const paginatedCoins = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredCoins.value.slice(start, end)
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

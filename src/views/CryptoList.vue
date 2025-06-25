<template>
  <div class="container py-1">
    <div class="d-flex justify-content-between pb-2">
      <h2 class="mb-2">Lista de Criptomonedas (en Bolivianos)</h2>
      <button class="btn btn-primary " @click="updateList">Actualizar Lista</button>
    </div>

    <div class="mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Buscar moneda por nombre o símbolo"
      />
    </div>

    <LoadingSpinner v-if="isLoadingCoins('cryptos')" />

    <div v-else-if="getError('cryptos')">
      <div class="alert alert-danger">{{ getError('cryptos') }}</div>
    </div>

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
    <div v-if="!filteredCoins.length && search && getError('coins')" class="text-center text-muted mt-4">
      No se encontraron monedas con ese nombre o símbolo.
    </div>

    <!-- Paginación -->
    <nav v-if="totalPages > 1 && !isLoadingCoins('cryptos') && !getError('cryptos')" class="mt-1">
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
  import LoadingSpinner from "../components/LoadingSpinner.vue";
  import { useCoinDetailStore } from "../stores/coinDetailStore";
  import { useCryptoData } from '../composables/useCryptoData'
  import { computed, onMounted, ref } from "vue";
  import { useRouter } from 'vue-router'
  import type { Coin } from "../types/coin";

  const { fetchCoins, coins, isLoadingCoins, getError } = useCryptoData()

  const router = useRouter()
  const coinDetailStore = useCoinDetailStore()

  const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

  const typeChange = 6.96
  const search = ref('')

  const currentPage = ref(1)
  const itemsPerPage = 10

  onMounted(async () => {
    await fetchCoins(URL)
  })

  const filteredCoins = computed(() => {
    return coins.filter((coin) => {
      const text = search.value.toLowerCase()
      currentPage.value = 1
      return (
        coin.name.toLowerCase().includes(text) ||
        coin.symbol.toLowerCase().includes(text)
      )
    })
  })

  const goToCoin = (coin:Coin) => {
    coinDetailStore.setCoinId(coin.id)
    router.push(`/coin/${coin.id}`)
  }

  const updateList = async() => {
    await fetchCoins(URL)
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

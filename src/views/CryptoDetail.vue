<template>
  <div class="px-4">
    <button class="btn btn-secondary " @click="goBack">Volver a la lista</button>
  </div>

  <LoadingSpinner v-if="isLoadingCoins('crypto')" />

  <ErrorMessage v-else-if="getError('crypto')" :message="getError('coins') || 'Ocurrió un error inesperado.'" />

  <div v-else-if="coin" class="d-flex justify-content-center align-items-center" style="height: 90dvh;">
    <div
      class="card shadow-lg p-4 bg-white rounded "
      style="max-width: 500px; width: 100%;"
    >
      <!-- Detalles de la Criptomoneda -->
      <img :src="coin.image" class="card-img-top mb-3" alt="Coin image" style="max-height: 250px; object-fit: contain;" />

      <div class="card-body text-left">
        <h5 class="card-title text-center fw-bold">{{ coin.name }}</h5>

        <p class="card-text text-center ">{{ coin.symbol.toUpperCase() }}</p>

        <p class="card-text d-flex justify-content-between fw-bold ">
          Precio actual Bs:
          <span>
            {{ (coin.current_price * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
          </span>
        </p>

        <p class=" d-flex justify-content-between fw-bold ">
          Cambio últimas 24h:
          <span :class="coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'">
            {{ coin.price_change_percentage_24h.toFixed(2) }}
          </span>
        </p>

        <p class="card-text d-flex justify-content-between fw-bold ">
          Capitalizacion del mercado Bs:
          <span>
            {{ (coin.market_cap * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
          </span>
        </p>

        <p class="card-text d-flex justify-content-between fw-bold ">
          Volumen total Bs:
          <span>
            {{ (coin.total_volume * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
          </span>
        </p>
      </div>

      <button class="btn btn-primary mt-3" @click="goOficialPage">Ir a la pagina Oficial</button>
    </div>
  </div>
</template>


<script setup lang="ts">
  import ErrorMessage from "../components/ErrorMessage.vue";
  import LoadingSpinner from "../components/LoadingSpinner.vue";
  import { onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCoinDetailStore } from '../stores/coinDetailStore'
  import { useCryptoData } from '../composables/useCryptoData'

  const router = useRouter()
  const coinDetailStore = useCoinDetailStore()

  const urlAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  const urlOficialPage = "https://www.coingecko.com/en/coins/"
  const { fetchCoinDetail, coin, isLoadingCoins, getError } = useCryptoData()

  const typeChange = 6.96

  const coinId = computed(() => coinDetailStore.coinId)

  onMounted(async () => {
    await fetchCoinDetail(`${urlAPI}&ids=${coinId.value}`)
  })

  const goBack = () => {
    router.back()
  }

  const goOficialPage = () => {
    window.open(`${urlOficialPage}/${coin?.id}`, '_blank')
  }
</script>


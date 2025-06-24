<template>
  <div class="px-4">
    <button class="btn btn-secondary " @click="goBack">Volver a la lista</button>
  </div>

  <div class="d-flex justify-content-center align-items-center" style="height: 90dvh;" v-if="coin.value">
    <div
      class="card shadow-lg p-4 bg-white rounded "
      style="max-width: 500px; width: 100%;"
    >
      <!-- Detalles de la Criptomoneda -->
      <img :src="coin.value.image" class="card-img-top mb-3" alt="Coin image" style="max-height: 250px; object-fit: contain;" />

      <div class="card-body text-left">
        <h5 class="card-title text-center fw-bold">{{ coin.value.name }}</h5>

        <p class="card-text text-center ">{{ coin.value.symbol.toUpperCase() }}</p>

        <p class="card-text d-flex justify-content-between fw-bold ">
          Precio actual Bs:
          <span>
            {{ (coin.value.current_price * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
          </span>
        </p>

        <p class=" d-flex justify-content-between fw-bold ">
          Cambio últimas 24h:
          <span :class="coin.value.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'">
            {{ coin.value.price_change_percentage_24h.toFixed(2) }}
          </span>
        </p>

        <p class="card-text d-flex justify-content-between fw-bold ">
          Capitalizacion del mercado Bs:
          <span>
            {{ (coin.value.market_cap * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
          </span>
        </p>

        <p class="card-text d-flex justify-content-between fw-bold ">
          Volumen total Bs:
          <span>
            {{ (coin.value.total_volume * typeChange).toLocaleString('es-BO', { minimumFractionDigits: 2 }) }}
          </span>
        </p>
      </div>

      <button class="btn btn-primary mt-3" @click="goOficialPage">Ir a la pagina Oficial</button>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCoinDetailStore } from '../stores/coinDetailStore'

  const router = useRouter()
  const coinDetailStore = useCoinDetailStore()

  const typeChange = 6.96

  const selectedCoin = computed(() => coinDetailStore.selectedCoin)
  const coin = ref({})

  const urlOficialPage = "https://www.coingecko.com/en/coins/bitcoin"

  onMounted(() => {
    coin.value = selectedCoin
  })

  const goBack = () => {
    router.back()
  }

  const goOficialPage = () => {
    window.open(urlOficialPage, '_blank')
  }
</script>


// src/stores/coinStore.ts
import { defineStore } from 'pinia'

export const useCoinDetailStore = defineStore('coinDetailStore', {
  state: () => {
    const stored = localStorage.getItem('coinDetail')
    return {
      selectedCoin: stored ? JSON.parse(stored) : null
    }
  },
  actions: {
    setCoin(coin: Record<string, any>) {
        this.selectedCoin = coin
        localStorage.setItem('coinDetail', JSON.stringify(coin))
    },
    clearCoin() {
      this.selectedCoin = null
      localStorage.removeItem('coinDetail')
    }
  }
})

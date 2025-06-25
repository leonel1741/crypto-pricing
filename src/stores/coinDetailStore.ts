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
        if (coin) {
          localStorage.setItem('coinDetail', JSON.stringify(coin))
        } else {
          localStorage.removeItem('coinDetail')
        }
    },
    clearCoin() {
      this.selectedCoin = null
      localStorage.removeItem('coinDetail')
    }
  }
})

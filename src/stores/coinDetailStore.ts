import { defineStore } from 'pinia'
import type { Coin } from '../types/coin'

export const useCoinDetailStore = defineStore('coinDetailStore', {
  state: () => {

    const stored = localStorage.getItem('coinDetail')
    return {
      selectedCoin: stored ? (JSON.parse(stored) as Coin) : null,
      coinId: null as string | null,
    }
  },
  actions: {
    setCoin(coin:Coin | null) {
        this.selectedCoin = coin
        if (coin) {
          localStorage.setItem('coinDetail', JSON.stringify(coin))
        } else {
          localStorage.removeItem('coinDetail')
        }
    },
    setCoinId(id:string) {
        this.coinId = id
    },
    clearCoin() {
      this.selectedCoin = null
      localStorage.removeItem('coinDetail')
    }
  }
})

// src/stores/coinListStore.ts
import { defineStore } from 'pinia'
import type { Coin } from '../types/coin'

export const useCoinListStore = defineStore('coinList', {
  state: () => {
  let coins: Coin[] = []
  const stored = localStorage.getItem('coinList')
  if (stored) {
    try {
      coins = JSON.parse(stored) as Coin[]
    } catch (e) {
      console.warn('Error parsing coinList from localStorage:', e)
    }
  }
  return {
    coins,
    error: null as string | null,
  }
},
  actions: {
    setCoins(coins: Coin[]) {
      this.coins = coins
      localStorage.setItem('coinList', JSON.stringify(coins))
    },
    clearCoins() {
      this.coins = []
      localStorage.removeItem('coinList')
    }
  }
})

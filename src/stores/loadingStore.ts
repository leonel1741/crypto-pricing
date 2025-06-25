// src/stores/uiStore.ts
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', {
  state: () => ({
    loadingStates: {} as Record<string, boolean>
  }),
  actions: {
    setLoading(key: string, value: boolean) {
      this.loadingStates[key] = value
    },
    isLoading(key: string) {
      return !!this.loadingStates[key]
    },
    clear() {
      this.loadingStates = {}
    }
  }
})

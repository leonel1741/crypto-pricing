import { defineStore } from 'pinia'

export const useErrorStore = defineStore('errorStore', {
  state: () => ({
    errorStates: {} as Record<string, string | null>
  }),
  actions: {
    setError(key: string, message: string | null) {
      this.errorStates[key] = message
    },
    getError(key: string) {
      return this.errorStates[key] ?? null
    },
    clear() {
      this.errorStates = {}
    }
  }
})

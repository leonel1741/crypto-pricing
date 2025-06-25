<template>
  <div class="d-flex vh-100 justify-content-center align-items-center bg-light">
    <div class="text-center p-4 bg-white rounded shadow" style="max-width: 400px; width: 100%;">
      <h1 class="display-1 text-danger">¡Oops!</h1>
      <h3 class="mb-3">{{ message }}</h3>
      <p class="mb-4">No pudimos cargar la información que solicitaste. Por favor, intenta recargar la página o vuelve más tarde.</p>
      <button class="btn btn-primary" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  interface Props {
    message: string | null
  }

  const props = defineProps<Props>()
  const { message } = props;

  const router = useRouter()

  const goBack = () => {
    router.back()
  }
</script>

<style scoped>
  .shadow {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
</style>

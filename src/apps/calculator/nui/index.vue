<script setup lang="ts">
import { useRouter } from 'vue-router'
import CalculatorForm from './components/CalculatorForm.vue'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="h-full bg-black text-white flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-800">
      <button 
        @click="goBack"
        class="text-blue-400 text-lg"
      >
        ← Back
      </button>
      <h1 class="text-lg font-semibold">Calculator1</h1>
      <div class="w-12"></div>
    </div>

    <!-- Calculator Content -->
    <div class="flex-1">
      <CalculatorForm />
    </div>
  </div>
</template>

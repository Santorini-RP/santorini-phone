<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="h-full bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-800">
      <button 
        @click="goBack"
        class="text-blue-400 text-lg hover:text-blue-300 transition-colors"
      >
        ← Back
      </button>
      <h1 class="text-lg font-semibold">Messages</h1>
      <div class="w-12"></div>
    </div>

    <!-- App Content -->
    <div class="flex-1 flex flex-col items-center justify-center p-8">
      <div class="text-center space-y-6">
        <!-- App Icon -->
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-2xl">
          💬
        </div>
        
        <!-- App Info -->
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">Messages</h2>
          <p class="text-gray-400">Text Messages</p>
        </div>
        
        <!-- Coming Soon -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full">
          <span class="text-white font-semibold">Em Breve</span>
        </div>
        
        <!-- Features List -->
        <div class="mt-8 space-y-3 text-left max-w-sm">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-gray-300">Interface moderna e intuitiva</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span class="text-gray-300">Funcionalidades avançadas</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-300">Integração com sistema</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

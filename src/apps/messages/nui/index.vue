<script setup lang="ts">
// Este componente agora serve como um layout para as rotas aninhadas de Mensagens.
</script>

<template>
  <div class="h-full w-full">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

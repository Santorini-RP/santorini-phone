<script setup lang="ts">
// This component now serves as a layout for the mail app's routes.
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

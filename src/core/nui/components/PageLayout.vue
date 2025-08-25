<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from './PageHeader.vue'
import SubPageHeader from './SubPageHeader.vue'

const props = defineProps<{
  pageTitle: string;
  previousTitle?: string;
}>();

const route = useRoute();

const isSubPage = computed(() => !!props.previousTitle);
const isScrolled = ref(false);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  isScrolled.value = target.scrollTop > 20;
}

const backRouteTitle = computed(() => {
  const matchedRoutes = route.matched;
  if (matchedRoutes.length > 1) {
    const parentRoute = matchedRoutes[matchedRoutes.length - 2];
    return parentRoute.meta.title as string || 'Back';
  }
  return props.previousTitle || 'Back';
});
</script>

<template>
  <div class="h-full text-black dark:text-white font-sans relative bg-gray-100 dark:bg-ios-dark-bg">
    <!-- Header -->
    <template v-if="isSubPage">
      <SubPageHeader 
        :title="pageTitle" 
        :previous-title="backRouteTitle"
      />
    </template>
    <template v-else>
      <PageHeader 
        :title="pageTitle" 
        :is-scrolled="isScrolled" 
      />
    </template>

    <!-- Main Content -->
    <div 
      class="h-full overflow-y-auto no-scrollbar"
      :class="{ 'pt-[4.5rem]': isSubPage }"
      @scroll="handleScroll"
    >
      <!-- Large Header for Main Pages -->
      <h1 v-if="!isSubPage" class="text-3xl font-bold px-6 pt-12 pb-4">
        {{ pageTitle }}
      </h1>
      
      <!-- Content Slot -->
      <slot></slot>

      <!-- Bottom Spacer ("Respiro") -->
      <div class="h-8"></div>
    </div>
  </div>
</template>

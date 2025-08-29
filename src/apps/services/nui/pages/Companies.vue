<script setup lang="ts">
import { useServicesStore } from '../store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';
import ServiceListItem from '../components/ServiceListItem.vue';

const servicesStore = useServicesStore();
</script>

<template>
  <PageLayout page-title="Companies">
    <div class="px-4 -mt-2 space-y-3">
      <ServiceListItem
        v-for="service in servicesStore.services"
        :key="service.id"
        :service="service"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSendStore } from '../store/sendStore';
import { CheckCircle } from 'lucide-vue-next';

const router = useRouter();
const sendStore = useSendStore();

const done = () => {
  sendStore.reset();
  router.push('/app/wallet');
};
</script>

<template>
  <div class="h-full w-full bg-gray-100 text-black flex flex-col font-sans">
    <!-- Header -->
    <header class="sticky top-0 z-20 pt-10 bg-gray-100/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-end px-2 pb-2">
        <button @click="done" class="text-lg px-2 text-blue-500 font-semibold">
          Done
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-center text-center pb-20">
      <CheckCircle class="w-24 h-24 text-blue-500 mb-6" />
      <h1 class="text-3xl font-bold">Done</h1>
      <p class="text-base text-gray-500 mt-2">
        You sent {{ sendStore.formattedAmount }} to {{ sendStore.formattedPhoneNumber }}
      </p>
    </main>
  </div>
</template>

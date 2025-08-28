<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== '';
});

const handleCreateAccount = () => {
  if (!isFormValid.value) return;
  alert(`Creating account for: ${email.value}@lbphone.com`);
};

const handleLogin = () => {
  router.push('/app/mail/login');
};
</script>

<template>
  <div class="h-full w-full bg-white dark:bg-ios-dark-bg flex flex-col justify-between items-center p-8 font-sans">
    <div class="w-full max-w-sm flex-1 flex flex-col justify-center">
      <form @submit.prevent="handleCreateAccount" class="w-full space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-base font-medium text-black dark:text-white mb-2">Email</label>
          <div class="flex items-center">
            <input
              v-model="email"
              id="email"
              type="text"
              placeholder="email"
              class="flex-1 w-full px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-ios-dark-card border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span class="px-4 py-3 text-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-t border-b border-r border-gray-300 dark:border-gray-700 rounded-r-md">
              @lbphone.com
            </span>
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-base font-medium text-black dark:text-white mb-2">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="··········"
            class="w-full px-4 py-3 text-lg text-black dark:text-white bg-white dark:bg-ios-dark-card border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Create Button -->
        <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full py-3 text-lg font-semibold rounded-md transition-colors"
          :class="isFormValid 
            ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-black dark:hover:bg-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'"
        >
          Create Email
        </button>
      </form>
    </div>

    <!-- Footer Link -->
    <div class="text-center pb-4">
      <p class="text-base text-gray-600 dark:text-gray-400">
        Already have an email address?
        <a @click.prevent="handleLogin" href="#" class="font-medium text-blue-500 hover:underline">Login</a>
      </p>
    </div>
  </div>
</template>

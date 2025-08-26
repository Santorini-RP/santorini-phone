<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import type { Contact } from '../store/chatStore';
import { ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  contact: {
    type: Object as PropType<Contact | null>,
    required: true,
  },
});

const emit = defineEmits(['close', 'save', 'delete']);

const localContact = ref({
  firstName: '',
  lastName: '',
  sync: true,
});

watch(() => props.contact, (newContact) => {
  if (newContact) {
    // Definindo o nome como na imagem de exemplo
    localContact.value.firstName = 'Amor ❤️';
    localContact.value.lastName = '';
    localContact.value.sync = true;
  }
}, { immediate: true, deep: true });

const handleSave = () => {
  // Em um app real, aqui você salvaria os dados do localContact
  emit('save', localContact.value);
  emit('close');
};

const handleDelete = () => {
  // Isso deve abrir outro modal de confirmação
  alert('Apagando contato...');
  emit('delete');
  emit('close');
};
</script>

<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="fixed inset-0 bg-black/30 z-50 flex items-end" @click.self="$emit('close')">
      <transition name="modal-slide">
        <div v-if="isVisible" class="w-full h-[95%] bg-[#F2F2F7] dark:bg-ios-dark-card rounded-t-2xl flex flex-col">
          <!-- Header -->
          <header class="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700/60">
            <button @click="$emit('close')" class="text-lg text-blue-500">Cancelar</button>
            <h2 class="text-lg font-semibold text-black dark:text-white">Editar contato</h2>
            <button @click="handleSave" class="text-lg font-bold text-blue-500">OK</button>
          </header>

          <!-- Form -->
          <main class="flex-1 overflow-y-auto p-4 space-y-6">
            <!-- Name Fields -->
            <div class="bg-white dark:bg-ios-dark-input rounded-xl">
              <div class="p-3 border-b border-gray-200 dark:border-gray-700/60">
                <input
                  v-model="localContact.firstName"
                  type="text"
                  placeholder="Nome"
                  class="w-full bg-transparent text-black dark:text-white text-lg outline-none"
                />
              </div>
              <div class="p-3">
                <input
                  v-model="localContact.lastName"
                  type="text"
                  placeholder="Sobrenome"
                  class="w-full bg-transparent text-black dark:text-white text-lg outline-none"
                />
              </div>
            </div>

            <!-- Phone Info -->
            <div class="bg-white dark:bg-ios-dark-input rounded-xl">
              <div class="flex items-center p-3 border-b border-gray-200 dark:border-gray-700/60 cursor-pointer">
                <span class="text-lg text-black dark:text-white w-24">Telefone</span>
                <span class="flex-1 text-right text-lg text-gray-500 dark:text-gray-400">Brasil</span>
                <ChevronRight class="w-5 h-5 text-gray-400 ml-2" />
              </div>
              <div class="flex items-center p-3">
                <span class="text-lg text-black dark:text-white w-24">Celular</span>
                <span class="flex-1 text-lg text-gray-500 dark:text-gray-400">{{ contact?.phone }}</span>
              </div>
            </div>
            
            <!-- Sync Toggle -->
            <div class="bg-white dark:bg-ios-dark-input rounded-xl p-3 flex items-center justify-between">
              <span class="text-lg text-black dark:text-white">Sincronizar contato com celular</span>
               <button
                @click="localContact.sync = !localContact.sync"
                class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
                :class="localContact.sync ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <span
                  class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                  :class="{ 'translate-x-5': localContact.sync }"
                ></span>
              </button>
            </div>

            <!-- Delete Button -->
            <div class="bg-white dark:bg-ios-dark-input rounded-xl">
              <button @click="handleDelete" class="w-full p-3 text-red-500 text-lg text-center">
                Apagar contato
              </button>
            </div>
          </main>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-slide-enter-active, .modal-slide-leave-active {
  transition: transform 0.3s ease-out;
}
.modal-slide-enter-from, .modal-slide-leave-to {
  transform: translateY(100%);
}
</style>

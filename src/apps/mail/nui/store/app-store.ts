import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
}

export const useMailStore = defineStore('mail', () => {
  const currentUserEmail = ref('marty@lbphone.com');

  const emails = ref<Email[]>([
    {
      id: 1,
      sender: 'breze@lbphone.com',
      subject: 'Meeting appointment',
      preview: 'Hello, I would like to schedule a meeting with you.\nPlease let me know when you are available.',
      time: '01:47',
      isRead: true,
    },
    {
      id: 2,
      sender: 'loaf@lbphone.com',
      subject: 'Look at these puppies!',
      preview: 'I was at a pet store earlier today and saw these cute puppies. I thoug...',
      time: '01:47',
      isRead: false,
    },
    {
      id: 3,
      sender: 'system@lbphone.com',
      subject: 'Action required',
      preview: 'Please verify your email address.',
      time: '01:47',
      isRead: false,
    },
    {
      id: 4,
      sender: 'system@lbphone.com',
      subject: 'Markdown support',
      preview: 'Our mail app supports markdown.\n\n**This is bold text**\n*This is italic text*\n\n- Item 1\n- Item 2',
      time: '01:47',
      isRead: false,
    },
  ]);

  const unreadCount = computed(() => emails.value.filter(e => !e.isRead).length);

  const getEmailById = computed(() => {
    return (id: number) => emails.value.find(e => e.id === id);
  });

  return {
    currentUserEmail,
    emails,
    unreadCount,
    getEmailById,
  }
})

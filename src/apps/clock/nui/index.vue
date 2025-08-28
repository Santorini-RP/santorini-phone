<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useClockStore, type ClockTab } from './store/app-store';
import TimePicker from './components/TimePicker.vue';
import TimerDisplay from './components/TimerDisplay.vue';
import RecentTimerItem from './components/RecentTimerItem.vue';
import WorldClockItem from './components/WorldClockItem.vue';
import AlarmItem from './components/AlarmItem.vue';
import { Globe, AlarmClock, Timer, Hourglass, Plus } from 'lucide-vue-next';

const clockStore = useClockStore();
const router = useRouter();

const tabs: { name: ClockTab, icon: any }[] = [
  { name: 'World Clock', icon: Globe },
  { name: 'Alarm', icon: AlarmClock },
  { name: 'Stopwatch', icon: Hourglass },
  { name: 'Timer', icon: Timer },
];

const selectedTime = {
  hours: clockStore.selectedHours,
  minutes: clockStore.selectedMinutes,
  seconds: clockStore.selectedSeconds,
};

const isStartDisabled = computed(() => clockStore.timerDuration === 0);

const handleAddNewAlarm = () => {
  router.push('/app/clock/new-alarm');
};
</script>

<template>
  <div class="h-full text-black dark:text-white bg-gray-100 dark:bg-ios-dark-bg flex flex-col font-sans">
    <!-- Header -->
    <div class="px-4 pt-10 pb-2">
        <template v-if="clockStore.activeTab === 'Alarm'">
            <div class="flex justify-between items-center">
                <button @click="clockStore.toggleAlarmEditMode" class="text-orange-500 text-lg">{{ clockStore.isAlarmEditing ? 'Done' : 'Edit' }}</button>
                <button v-if="!clockStore.isAlarmEditing" @click="handleAddNewAlarm" class="text-orange-500"><Plus class="w-7 h-7" /></button>
            </div>
            <h1 class="text-3xl font-bold mt-2">Alarm</h1>
        </template>
        <template v-else>
            <h1 class="text-3xl font-bold">{{ clockStore.activeTab }}</h1>
        </template>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col p-4 pt-0 overflow-y-auto no-scrollbar">
      
      <!-- World Clock View -->
      <template v-if="clockStore.activeTab === 'World Clock'">
        <div class="w-full space-y-3">
          <WorldClockItem 
            v-for="clock in clockStore.worldClocks"
            :key="clock.id"
            :clock="clock"
            :current-time="clockStore.currentTime"
          />
        </div>
      </template>

      <!-- Alarm View -->
      <template v-if="clockStore.activeTab === 'Alarm'">
        <div class="w-full space-y-2">
            <AlarmItem 
                v-for="alarm in clockStore.alarms"
                :key="alarm.id"
                :alarm="alarm"
                :is-editing="clockStore.isAlarmEditing"
                @toggle="clockStore.toggleAlarm"
                @delete="clockStore.deleteAlarm"
            />
        </div>
      </template>

      <!-- Stopwatch View -->
      <template v-if="clockStore.activeTab === 'Stopwatch'">
        <div class="w-full flex flex-col items-center justify-between flex-1 space-y-4">
          <div class="flex-1 flex items-center justify-center w-full">
            <h2 class="text-8xl font-thin tracking-tighter text-black dark:text-white font-mono">
              {{ clockStore.formattedStopwatchTime }}
            </h2>
          </div>

          <div class="flex justify-around items-center w-full my-4">
            <button 
              @click="clockStore.isStopwatchRunning ? clockStore.recordLap() : clockStore.resetStopwatch()"
              :disabled="!clockStore.isStopwatchRunning && clockStore.stopwatchTime === 0"
              class="w-20 h-20 rounded-full text-lg font-medium flex items-center justify-center transition-colors text-black dark:text-white bg-gray-300/70 dark:bg-gray-700/70"
              :class="{
                'opacity-50 cursor-not-allowed': !clockStore.isStopwatchRunning && clockStore.stopwatchTime === 0,
                'hover:bg-gray-400/70 dark:hover:bg-gray-600/70': !(!clockStore.isStopwatchRunning && clockStore.stopwatchTime === 0)
              }"
            >
              {{ clockStore.isStopwatchRunning ? 'Lap' : 'Reset' }}
            </button>
            <button 
              @click="clockStore.isStopwatchRunning ? clockStore.stopStopwatch() : clockStore.startStopwatch()"
              class="w-20 h-20 rounded-full text-lg font-medium flex items-center justify-center transition-colors"
              :class="[
                clockStore.isStopwatchRunning 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              ]"
            >
              {{ clockStore.isStopwatchRunning ? 'Stop' : 'Start' }}
            </button>
          </div>

          <div class="w-full h-48 bg-white dark:bg-ios-dark-card rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div class="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700/60 flex-shrink-0">
              <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 w-1/4 text-left">Lap</span>
              <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 w-1/2 text-center">Time</span>
              <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 w-1/4 text-right">Total</span>
            </div>
            <div class="flex-1 overflow-y-auto no-scrollbar">
              <div v-if="clockStore.laps.length === 0 && clockStore.stopwatchTime === 0" class="flex items-center justify-center h-full text-gray-400">
                Press Start to begin.
              </div>
              <div v-else>
                <div 
                  v-for="lap in clockStore.formattedLaps" 
                  :key="lap.lapNumber"
                  class="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700/60 last:border-b-0 font-mono text-lg"
                  :class="{
                    'text-red-500': lap.status === 'slowest',
                    'text-green-500': lap.status === 'fastest',
                    'text-black dark:text-white': lap.status === 'normal'
                  }"
                >
                  <span class="w-1/4 text-left">{{ lap.lapNumber }}</span>
                  <span class="w-1/2 text-center">{{ lap.formattedLapTime }}</span>
                  <span class="w-1/4 text-right">{{ lap.formattedTotalTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Timer View -->
      <template v-if="clockStore.activeTab === 'Timer'">
        <div v-if="!clockStore.isTimerActive" class="w-full flex flex-col items-center justify-start flex-1 space-y-4">
          <TimePicker 
            :modelValue="selectedTime"
            @update:modelValue="({ hours, minutes, seconds }) => {
              clockStore.setHours(hours);
              clockStore.setMinutes(minutes);
              clockStore.setSeconds(seconds);
            }"
          />
          <div class="flex justify-around items-center w-full my-4">
            <button @click="clockStore.cancelTimer" class="w-20 h-20 rounded-full bg-gray-300/70 dark:bg-gray-700/70 text-black dark:text-white text-lg font-medium flex items-center justify-center transition-colors hover:bg-gray-400/70 dark:hover:bg-gray-600/70">Reset</button>
            <button @click="clockStore.startTimer" :disabled="isStartDisabled" class="w-20 h-20 rounded-full bg-green-500 text-white text-lg font-medium flex items-center justify-center transition-colors" :class="isStartDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'">Start</button>
          </div>
          <div class="w-full px-2">
            <h2 class="text-xl font-bold mb-2">Recents</h2>
            <div v-if="clockStore.recentTimers.length > 0" class="bg-white dark:bg-ios-dark-card rounded-xl divide-y divide-gray-200 dark:divide-gray-700/60">
              <RecentTimerItem v-for="(duration, index) in clockStore.recentTimers" :key="`${duration}-${index}`" :duration="duration" @start="clockStore.startRecentTimer(duration)" @delete="clockStore.removeRecentTimer(index)" />
            </div>
            <div v-else class="bg-white dark:bg-ios-dark-card rounded-xl p-4 text-center text-gray-500 dark:text-gray-400">No Recents</div>
          </div>
        </div>
        <div v-else class="w-full flex flex-col items-center justify-around flex-1">
          <TimerDisplay :remainingTime="clockStore.remainingTime" :totalDuration="clockStore.initialDuration" class="mt-8" />
          <div class="flex justify-around items-center w-full">
            <button @click="clockStore.cancelTimer" class="w-20 h-20 rounded-full bg-gray-300/70 dark:bg-gray-700/70 text-black dark:text-white text-lg font-medium flex items-center justify-center transition-colors hover:bg-gray-400/70 dark:hover:bg-gray-600/70">Cancel</button>
            <button @click="clockStore.stopTimer" class="w-20 h-20 rounded-full bg-red-500 text-white text-lg font-medium flex items-center justify-center transition-colors hover:bg-red-600">Stop</button>
          </div>
        </div>
      </template>
    </div>

    <!-- Tab Bar -->
    <div class="bg-gray-200/70 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-300/50 dark:border-gray-700/50 px-4 pt-2 pb-8">
      <div class="flex justify-around">
        <button 
          v-for="tab in tabs" 
          :key="tab.name"
          @click="clockStore.activeTab = tab.name"
          class="flex flex-col items-center space-y-1 transition-colors w-20"
          :class="clockStore.activeTab === tab.name ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        >
          <component :is="tab.icon" class="w-6 h-6" :fill="clockStore.activeTab === tab.name ? 'currentColor' : 'none'" />
          <span class="text-xs font-medium">{{ tab.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

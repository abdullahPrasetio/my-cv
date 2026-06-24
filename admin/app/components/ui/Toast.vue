<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id"
        :class="['px-4 py-3 rounded-xl text-sm font-medium shadow-xl max-w-xs flex items-center gap-2',
          t.type === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-red-600 text-white']">
        <svg v-if="t.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="shrink-0">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {{ t.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(1rem); }
</style>

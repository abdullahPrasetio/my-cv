<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id"
        :class="['px-4 py-3 rounded-lg text-sm font-medium shadow-lg max-w-xs',
          t.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white']">
        {{ t.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all .3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(1rem); }
</style>

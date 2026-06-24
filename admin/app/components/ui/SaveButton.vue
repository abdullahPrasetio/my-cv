<script setup lang="ts">
defineProps<{ loading?: boolean; label?: string }>()
</script>

<template>
  <button type="submit" :disabled="loading"
    class="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
    <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    {{ label || 'Simpan' }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  version: string
  username: string
  portfolioUrl: string
  active: boolean
}>()

defineEmits<{ select: [string]; open: [string] }>()

const loaded = ref(false)
const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!cardRef.value) return
  const observer = new IntersectionObserver(
    (entries) => { if (entries[0]?.isIntersecting) { loaded.value = true; observer.disconnect() } },
    { threshold: 0.1 }
  )
  observer.observe(cardRef.value)
})
</script>

<template>
  <div
    ref="cardRef"
    @click="$emit('select', version)"
    :class="[
      'relative rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200 group',
      active
        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
    ]"
  >
    <!-- iframe preview container -->
    <div class="relative bg-slate-100 dark:bg-slate-800 overflow-hidden" style="height: 180px;">
      <!-- Placeholder while loading -->
      <div v-if="!loaded" class="absolute inset-0 flex items-center justify-center">
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
          <span class="text-xs text-muted">Loading...</span>
        </div>
      </div>

      <!-- Live iframe scaled to fit -->
      <div v-if="loaded" class="absolute inset-0 pointer-events-none overflow-hidden">
        <div style="width: 1280px; height: 900px; transform-origin: top left; transform: scale(0.234375);">
          <iframe
            :src="`${portfolioUrl}/p/${username}/${version}`"
            class="w-full h-full border-0"
            scrolling="no"
            loading="lazy"
            :title="`Preview ${version}`"
          />
        </div>
      </div>

      <!-- Hover overlay with open button -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button
          type="button"
          @click.stop="$emit('open', version)"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg shadow transition-colors hover:bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Buka Tab
        </button>
      </div>

      <!-- Active indicator -->
      <div v-if="active" class="absolute top-2 right-2">
        <span class="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow">Aktif</span>
      </div>
    </div>

    <!-- Label -->
    <div :class="['px-3 py-2.5 flex items-center justify-between', active ? 'bg-blue-50 dark:bg-blue-600/10' : 'surface-raised']">
      <span :class="['text-sm font-bold', active ? 'text-blue-600 dark:text-blue-400' : 'text-heading']">
        {{ version.toUpperCase() }}
      </span>
      <svg v-if="active" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" class="text-blue-500">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  </div>
</template>

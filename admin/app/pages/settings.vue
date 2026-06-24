<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

definePageMeta({ middleware: 'auth' })

const { fetchConfig, saveConfig } = useConfigApi()
const { success, error } = useToast()
const { user } = useAuth()
const config = useRuntimeConfig()

const activeVersion = ref('v1')
const loading = ref(false)
const versions = Array.from({ length: 20 }, (_, i) => `v${i + 1}`)

const username = computed(() => (user.value as any)?.username || '')
const portfolioUrl = computed(() => config.public.portfolioUrl as string)

onMounted(async () => {
  try {
    const cfg = await fetchConfig()
    activeVersion.value = cfg.default_version
  } catch { error('Gagal memuat konfigurasi') }
})

const onSelect = (v: string) => { activeVersion.value = v }

const onOpen = (v: string) => {
  if (!username.value) return
  window.open(`${portfolioUrl.value}/p/${username.value}/${v}`, '_blank', 'noopener,noreferrer')
}

const onSave = async () => {
  loading.value = true
  try {
    await saveConfig(activeVersion.value)
    success('Versi berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}
</script>

<template>
  <div class="page-container max-w-5xl">
    <h2 class="page-title">Settings</h2>
    <p class="page-subtitle">Pilih versi portfolio yang tampil ke publik. Klik kartu untuk memilih, atau "Buka Tab" untuk preview langsung.</p>

    <div class="space-y-6">
      <!-- Warning if no username -->
      <div v-if="!username"
        class="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl text-sm text-amber-700 dark:text-amber-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="shrink-0">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Preview tidak tersedia — username belum diset. Silakan login ulang.
      </div>

      <!-- Version grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <UiVersionPreviewCard
          v-for="v in versions"
          :key="v"
          :version="v"
          :username="username"
          :portfolio-url="portfolioUrl"
          :active="activeVersion === v"
          @select="onSelect"
          @open="onOpen"
        />
      </div>

      <!-- Save bar -->
      <div class="surface-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-heading">Versi terpilih: <span class="text-blue-600 dark:text-blue-400">{{ activeVersion.toUpperCase() }}</span></p>
          <p class="text-xs text-muted mt-0.5">Klik "Simpan" untuk mengaktifkan versi ini ke publik.</p>
        </div>
        <UiSaveButton :loading="loading" @click="onSave" />
      </div>
    </div>
  </div>
</template>

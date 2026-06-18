<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { fetchConfig, saveConfig } = useConfigApi()
const { success, error } = useToast()
const activeVersion = ref('v1')
const loading = ref(false)

onMounted(async () => {
  try {
    const cfg = await fetchConfig()
    activeVersion.value = cfg.default_version
  } catch { error('Gagal memuat konfigurasi') }
})

const versions = Array.from({ length: 10 }, (_, i) => `v${i + 1}`)

const onSave = async () => {
  loading.value = true
  try {
    await saveConfig(activeVersion.value)
    success('Versi berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}
</script>

<template>
  <div class="p-8 max-w-2xl">
    <h2 class="text-2xl font-bold text-white mb-1">Settings</h2>
    <p class="text-slate-400 text-sm mb-8">Pilih versi portfolio yang tampil ke publik</p>

    <div class="bg-slate-900 border border-slate-700/50 rounded-xl p-6 space-y-6">
      <div>
        <p class="text-sm font-medium text-slate-300 mb-3">Versi Portfolio</p>
        <div class="grid grid-cols-5 gap-2">
          <button v-for="v in versions" :key="v" type="button" @click="activeVersion = v"
            :class="['py-3 rounded-lg text-sm font-bold transition-colors',
              activeVersion === v ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700']">
            {{ v.toUpperCase() }}
          </button>
        </div>
      </div>
      <div class="flex justify-end">
        <UiSaveButton :loading="loading" @click="onSave" />
      </div>
    </div>
  </div>
</template>

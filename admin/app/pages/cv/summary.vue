<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()
const loading = ref(false)
let fullCv: any = null
const summary = ref({ en: '', id: '' })

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    summary.value = fullCv.summary ?? { en: '', id: '' }
  } catch { error('Gagal memuat data CV') }
})

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, summary: summary.value })
    success('Summary berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}
</script>

<template>
  <div class="page-container max-w-2xl">
    <h2 class="page-title">Summary</h2>
    <p class="page-subtitle">Ringkasan profesional bilingual</p>
    <form @submit.prevent="onSave" class="surface-card rounded-xl p-5 space-y-4">
      <UiBilingualInput label="Summary" v-model="summary" :textarea="true" :rows="6" />
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

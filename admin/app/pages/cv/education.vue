<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()

interface Education { institution: string; degree: string; period: string }
const educations = ref<Education[]>([])
const loading = ref(false)
let fullCv: any = null

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    educations.value = fullCv.education ? JSON.parse(JSON.stringify(fullCv.education)) : []
  } catch { error('Gagal memuat data CV') }
})

const add = () => educations.value.push({ institution: '', degree: '', period: '' })
const remove = (i: number) => educations.value.splice(i, 1)

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, education: educations.value })
    success('Pendidikan berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}
</script>

<template>
  <div class="page-container max-w-2xl">
    <h2 class="page-title">Pendidikan</h2>
    <p class="page-subtitle">Riwayat pendidikan formal</p>

    <form @submit.prevent="onSave" class="space-y-4">
      <div v-for="(edu, i) in educations" :key="i" class="surface-card rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <span class="nav-section-label">Pendidikan #{{ i + 1 }}</span>
          <button type="button" @click="remove(i)" class="btn-danger">Hapus</button>
        </div>
        <div>
          <label class="text-label">Institusi</label>
          <input v-model="edu.institution" class="input-field" placeholder="Universitas / Sekolah" />
        </div>
        <div>
          <label class="text-label">Gelar / Program</label>
          <input v-model="edu.degree" class="input-field" placeholder="Teknik Informatika (GPA 3.56)" />
        </div>
        <div>
          <label class="text-label">Periode</label>
          <input v-model="edu.period" class="input-field" placeholder="2017 – 2021" />
        </div>
      </div>

      <button type="button" @click="add"
        class="w-full py-3 border border-dashed border-slate-300 dark:border-slate-600
               hover:border-blue-500 text-muted hover:text-blue-500 dark:hover:text-blue-400
               rounded-xl text-sm font-medium transition-colors">
        + Tambah Pendidikan
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

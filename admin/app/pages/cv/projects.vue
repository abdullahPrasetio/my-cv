<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()

interface Project {
  name: string
  image: string
  link?: string
  description: { en: string; id: string }
  tags: string[]
}

const projects = ref<Project[]>([])
const loading = ref(false)
let fullCv: any = null

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    projects.value = fullCv.projects ? JSON.parse(JSON.stringify(fullCv.projects)) : []
  } catch { error('Gagal memuat data CV') }
})

const add = () => projects.value.push({
  name: '', image: '', link: '', description: { en: '', id: '' }, tags: []
})
const remove = (i: number) => projects.value.splice(i, 1)

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, projects: projects.value })
    success('Proyek berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}
</script>

<template>
  <div class="page-container max-w-3xl">
    <h2 class="page-title">Proyek</h2>
    <p class="page-subtitle">Daftar proyek dengan deskripsi bilingual dan link</p>

    <form @submit.prevent="onSave" class="space-y-5">
      <div v-for="(p, i) in projects" :key="i" class="surface-card rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-heading">{{ p.name || `Proyek #${i + 1}` }}</span>
          <button type="button" @click="remove(i)" class="btn-danger">Hapus</button>
        </div>

        <div>
          <label class="text-label">Nama Proyek</label>
          <input v-model="p.name" class="input-field" />
        </div>

        <div>
          <label class="text-label">Gambar</label>
          <UiImageUpload v-model="p.image" folder="projects" />
        </div>

        <div>
          <label class="text-label">Link Proyek (opsional)</label>
          <input v-model="p.link" class="input-field" placeholder="https://github.com/... atau https://demo.com/..." />
          <p class="text-xs text-muted mt-1">Kosongkan jika tidak ada — project tidak akan bisa diklik di portfolio.</p>
        </div>

        <UiBilingualInput label="Deskripsi" v-model="p.description" :textarea="true" :rows="3" />

        <div>
          <label class="text-label">Tags (Teknologi)</label>
          <UiTagInput v-model="p.tags" />
        </div>
      </div>

      <button type="button" @click="add"
        class="w-full py-3 border border-dashed border-slate-300 dark:border-slate-600
               hover:border-blue-500 text-muted hover:text-blue-500 dark:hover:text-blue-400
               rounded-xl text-sm font-medium transition-colors">
        + Tambah Proyek
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

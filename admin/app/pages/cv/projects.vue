<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()

interface Project { name: string; image: string; description: { en: string; id: string }; tags: string[] }
const projects = ref<Project[]>([])
const loading = ref(false)
let fullCv: any = null

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    projects.value = fullCv.projects ? JSON.parse(JSON.stringify(fullCv.projects)) : []
  } catch { error('Gagal memuat data CV') }
})

const add = () => projects.value.push({ name: '', image: '', description: { en: '', id: '' }, tags: [] })
const remove = (i: number) => projects.value.splice(i, 1)

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, projects: projects.value })
    success('Proyek berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}

const inputClass = 'w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none'
</script>

<template>
  <div class="p-8 max-w-3xl">
    <h2 class="text-2xl font-bold text-white mb-1">Proyek</h2>
    <p class="text-slate-400 text-sm mb-8">Daftar proyek dengan deskripsi bilingual</p>

    <form @submit.prevent="onSave" class="space-y-5">
      <div v-for="(p, i) in projects" :key="i"
        class="bg-slate-900 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-white">{{ p.name || `Proyek #${i + 1}` }}</span>
          <button type="button" @click="remove(i)" class="text-slate-500 hover:text-red-400 text-sm">Hapus</button>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Nama Proyek</label>
          <input v-model="p.name" :class="inputClass" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Gambar</label>
          <UiImageUpload v-model="p.image" folder="projects" />
        </div>
        <UiBilingualInput label="Deskripsi" v-model="p.description" :textarea="true" :rows="3" />
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Tags (Teknologi)</label>
          <UiTagInput v-model="p.tags" />
        </div>
      </div>

      <button type="button" @click="add"
        class="w-full py-3 border border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-xl text-sm font-medium transition-colors">
        + Tambah Proyek
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

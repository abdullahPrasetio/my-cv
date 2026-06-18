<script setup lang="ts">
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

const inputClass = 'w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none'
</script>

<template>
  <div class="p-8 max-w-2xl">
    <h2 class="text-2xl font-bold text-white mb-1">Pendidikan</h2>
    <p class="text-slate-400 text-sm mb-8">Riwayat pendidikan formal</p>

    <form @submit.prevent="onSave" class="space-y-4">
      <div v-for="(edu, i) in educations" :key="i"
        class="bg-slate-900 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pendidikan #{{ i + 1 }}</span>
          <button type="button" @click="remove(i)" class="text-slate-500 hover:text-red-400 text-sm transition-colors">Hapus</button>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Institusi</label>
          <input v-model="edu.institution" :class="inputClass" placeholder="Universitas / Sekolah" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Gelar / Program</label>
          <input v-model="edu.degree" :class="inputClass" placeholder="Teknik Informatika (GPA 3.56)" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Periode</label>
          <input v-model="edu.period" :class="inputClass" placeholder="2017 - 2021" />
        </div>
      </div>

      <button type="button" @click="add"
        class="w-full py-3 border border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-xl text-sm font-medium transition-colors">
        + Tambah Pendidikan
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

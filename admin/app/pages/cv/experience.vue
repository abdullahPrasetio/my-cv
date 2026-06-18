<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()

interface Role { title: { en: string; id: string }; description: { en: string; id: string } }
interface Experience { company: string; period: string; roles: Role[] }

const experiences = ref<Experience[]>([])
const loading = ref(false)
let fullCv: any = null

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    experiences.value = fullCv.experience ? JSON.parse(JSON.stringify(fullCv.experience)) : []
  } catch { error('Gagal memuat data CV') }
})

const addExp = () => experiences.value.push({
  company: '', period: '',
  roles: [{ title: { en: '', id: '' }, description: { en: '', id: '' } }],
})
const removeExp = (i: number) => experiences.value.splice(i, 1)
const addRole = (exp: Experience) => exp.roles.push({ title: { en: '', id: '' }, description: { en: '', id: '' } })
const removeRole = (exp: Experience, ri: number) => exp.roles.splice(ri, 1)

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, experience: experiences.value })
    success('Pengalaman berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}

const inputClass = 'w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none'
</script>

<template>
  <div class="p-8 max-w-3xl">
    <h2 class="text-2xl font-bold text-white mb-1">Pengalaman</h2>
    <p class="text-slate-400 text-sm mb-8">Riwayat pekerjaan dengan multi-peran</p>

    <form @submit.prevent="onSave" class="space-y-6">
      <div v-for="(exp, i) in experiences" :key="i"
        class="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
        <div class="p-5 border-b border-slate-700/50 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-white">{{ exp.company || `Perusahaan #${i + 1}` }}</span>
            <button type="button" @click="removeExp(i)" class="text-slate-500 hover:text-red-400 text-sm">Hapus</button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-slate-300 mb-1.5 block">Nama Perusahaan</label>
              <input v-model="exp.company" :class="inputClass" />
            </div>
            <div>
              <label class="text-sm font-medium text-slate-300 mb-1.5 block">Periode</label>
              <input v-model="exp.period" :class="inputClass" placeholder="Jan 2023 - Present" />
            </div>
          </div>
        </div>

        <div class="p-5 space-y-5">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peran / Jabatan</p>
          <div v-for="(role, ri) in exp.roles" :key="ri"
            class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-xs text-slate-400">Peran #{{ ri + 1 }}</span>
              <button v-if="exp.roles.length > 1" type="button" @click="removeRole(exp, ri)"
                class="text-slate-500 hover:text-red-400 text-xs">Hapus Peran</button>
            </div>
            <UiBilingualInput label="Jabatan" v-model="role.title" />
            <UiBilingualInput label="Deskripsi" v-model="role.description" :textarea="true" :rows="3" />
          </div>
          <button type="button" @click="addRole(exp)"
            class="w-full py-2.5 border border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-lg text-sm transition-colors">
            + Tambah Peran
          </button>
        </div>
      </div>

      <button type="button" @click="addExp"
        class="w-full py-3 border border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-xl text-sm font-medium transition-colors">
        + Tambah Pengalaman Kerja
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

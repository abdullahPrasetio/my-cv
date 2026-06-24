<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
</script>

<template>
  <div class="page-container max-w-3xl">
    <h2 class="page-title">Pengalaman</h2>
    <p class="page-subtitle">Riwayat pekerjaan dengan multi-peran</p>

    <form @submit.prevent="onSave" class="space-y-6">
      <div v-for="(exp, i) in experiences" :key="i" class="surface-card rounded-xl overflow-hidden">
        <!-- Company header -->
        <div class="p-5 border-b divider space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-heading">{{ exp.company || `Perusahaan #${i + 1}` }}</span>
            <button type="button" @click="removeExp(i)" class="btn-danger">Hapus</button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-label">Nama Perusahaan</label>
              <input v-model="exp.company" class="input-field" />
            </div>
            <div>
              <label class="text-label">Periode</label>
              <input v-model="exp.period" class="input-field" placeholder="Jan 2023 – Present" />
            </div>
          </div>
        </div>

        <!-- Roles -->
        <div class="p-5 space-y-4">
          <p class="nav-section-label">Peran / Jabatan</p>
          <div v-for="(role, ri) in exp.roles" :key="ri"
            class="surface-raised rounded-xl p-4 space-y-4 border border-slate-200 dark:border-slate-700">
            <div class="flex justify-between items-center">
              <span class="text-xs text-muted font-medium">Peran #{{ ri + 1 }}</span>
              <button v-if="exp.roles.length > 1" type="button" @click="removeRole(exp, ri)"
                class="btn-danger text-xs">Hapus Peran</button>
            </div>
            <UiBilingualInput label="Jabatan" v-model="role.title" />
            <UiBilingualInput label="Deskripsi" v-model="role.description" :textarea="true" :rows="3" />
          </div>
          <button type="button" @click="addRole(exp)"
            class="w-full py-2.5 border border-dashed border-slate-300 dark:border-slate-600
                   hover:border-blue-500 text-muted hover:text-blue-500 dark:hover:text-blue-400
                   rounded-xl text-sm transition-colors">
            + Tambah Peran
          </button>
        </div>
      </div>

      <button type="button" @click="addExp"
        class="w-full py-3 border border-dashed border-slate-300 dark:border-slate-600
               hover:border-blue-500 text-muted hover:text-blue-500 dark:hover:text-blue-400
               rounded-xl text-sm font-medium transition-colors">
        + Tambah Pengalaman Kerja
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

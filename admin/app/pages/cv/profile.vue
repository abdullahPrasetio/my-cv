<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()
const loading = ref(false)
let fullCv: any = null

const form = reactive({
  name: '', avatar: '', is_avatar: false,
  title: { en: '', id: '' }, location: '',
  contacts: { email: '', phone: '', linkedin: '', youtube: '', github: '' },
})

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    Object.assign(form, {
      name: fullCv.name ?? '',
      avatar: fullCv.avatar ?? '',
      is_avatar: fullCv.is_avatar ?? false,
      title: fullCv.title ?? { en: '', id: '' },
      location: fullCv.location ?? '',
      contacts: { email: '', phone: '', linkedin: '', youtube: '', github: '', ...(fullCv.contacts ?? {}) },
    })
  } catch { error('Gagal memuat data CV') }
})

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, ...form })
    success('Profile berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}

const inputClass = 'w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none'
</script>

<template>
  <div class="p-8 max-w-2xl">
    <h2 class="text-2xl font-bold text-white mb-1">Profile</h2>
    <p class="text-slate-400 text-sm mb-8">Informasi dasar CV</p>

    <form @submit.prevent="onSave" class="space-y-6">
      <div class="bg-slate-900 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Nama Lengkap</label>
          <input v-model="form.name" :class="inputClass" />
        </div>
        <UiBilingualInput label="Judul / Posisi" v-model="form.title" />
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Lokasi</label>
          <input v-model="form.location" :class="inputClass" placeholder="Jakarta, Indonesia" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Avatar URL</label>
          <UiImageUpload v-model="form.avatar" folder="avatar" />
        </div>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" v-model="form.is_avatar" class="w-4 h-4 rounded border-slate-600" />
          <span class="text-sm text-slate-300">Tampilkan foto</span>
        </label>
      </div>

      <div class="bg-slate-900 border border-slate-700/50 rounded-xl p-5 space-y-4">
        <p class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Kontak</p>
        <div v-for="field in ['email','phone','linkedin','youtube','github']" :key="field">
          <label class="text-sm font-medium text-slate-300 mb-1.5 block capitalize">{{ field }}</label>
          <input v-model="(form.contacts as any)[field]" :class="inputClass" />
        </div>
      </div>

      <div class="flex justify-end">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

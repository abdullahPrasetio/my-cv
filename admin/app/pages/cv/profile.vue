<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

definePageMeta({ middleware: 'auth' })

const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()
const config = useRuntimeConfig()
const { authHeaders } = useAuth()
const loading = ref(false)
const uploadingResume = ref(false)
let fullCv: any = null

const form = reactive({
  name: '', avatar: '', is_avatar: false,
  title: { en: '', id: '' }, location: '',
  contacts: { email: '', phone: '', linkedin: '', youtube: '', github: '' },
  resume: '',
})

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    Object.assign(form, {
      name:      fullCv.name      ?? '',
      avatar:    fullCv.avatar    ?? '',
      is_avatar: fullCv.is_avatar ?? false,
      title:     fullCv.title     ?? { en: '', id: '' },
      location:  fullCv.location  ?? '',
      contacts:  { email: '', phone: '', linkedin: '', youtube: '', github: '', ...(fullCv.contacts ?? {}) },
      resume:    fullCv.resume    ?? '',
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

const getContact = (field: string) => (form.contacts as Record<string, string>)[field] ?? ''
const setContact = (field: string, e: Event) => {
  (form.contacts as Record<string, string>)[field] = (e.target as HTMLInputElement).value
}

const MAX_RESUME_SIZE = 2 * 1024 * 1024 // 2MB

const onResumeUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > MAX_RESUME_SIZE) {
    error('Ukuran file melebihi batas 2MB')
    return
  }

  uploadingResume.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'resume')
    if (form.resume) fd.append('old_url', form.resume)
    const res = await fetch(`${config.public.apiUrl}/media/upload`, {
      method: 'POST',
      headers: authHeaders.value,
      body: fd,
    })
    if (!res.ok) {
      const json = await res.json() as { message?: string }
      error(json.message || 'Gagal upload resume')
      return
    }
    const json = await res.json() as { data: { url: string } }
    form.resume = json.data.url
    success('Resume berhasil diupload!')
  } catch { error('Gagal upload resume') } finally { uploadingResume.value = false }
}

const inputClass = 'w-full bg-slate-800/60 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none transition-colors placeholder:text-slate-600'
const sectionClass = 'bg-slate-900/60 border border-white/6 rounded-2xl p-6 space-y-5'
</script>

<template>
  <div class="p-8 max-w-2xl space-y-6">
    <div>
      <p class="text-slate-400 text-sm">Informasi dasar yang tampil di portfolio.</p>
    </div>

    <form @submit.prevent="onSave" class="space-y-5">
      <!-- Identity -->
      <div :class="sectionClass">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Identitas</p>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Nama Lengkap</label>
          <input v-model="form.name" :class="inputClass" placeholder="Nama kamu" />
        </div>
        <UiBilingualInput label="Judul / Posisi" v-model="form.title" />
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Lokasi</label>
          <input v-model="form.location" :class="inputClass" placeholder="Jakarta, Indonesia" />
        </div>
      </div>

      <!-- Avatar -->
      <div :class="sectionClass">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Foto Profil</p>
        <UiImageUpload v-model="form.avatar" folder="avatar" :old-url="form.avatar" />
        <label class="flex items-center gap-3 cursor-pointer select-none">
          <div :class="['w-10 h-6 rounded-full transition-colors relative shrink-0', form.is_avatar ? 'bg-blue-600' : 'bg-slate-700']"
            @click="form.is_avatar = !form.is_avatar">
            <div :class="['absolute top-1 w-4 h-4 rounded-full bg-white transition-all', form.is_avatar ? 'left-5' : 'left-1']" />
          </div>
          <span class="text-sm text-slate-300">Tampilkan foto di portfolio</span>
        </label>
      </div>

      <!-- Resume -->
      <div :class="sectionClass">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Resume / CV</p>

        <!-- Current resume -->
        <div v-if="form.resume" class="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
          <svg class="text-red-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span class="text-sm text-slate-300 truncate flex-1">Resume tersimpan</span>
          <a :href="form.resume" target="_blank" download
            class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </a>
          <button type="button" @click="form.resume = ''" class="text-slate-600 hover:text-red-400 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Upload area -->
        <label class="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl cursor-pointer transition-colors group">
          <svg class="text-slate-600 group-hover:text-slate-400 transition-colors" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <div class="text-center">
            <p class="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
              {{ uploadingResume ? 'Mengupload...' : (form.resume ? 'Ganti resume' : 'Upload resume PDF') }}
            </p>
            <p class="text-xs text-slate-600 mt-1">PDF, maks 10MB</p>
          </div>
          <input type="file" accept=".pdf,application/pdf" class="hidden" :disabled="uploadingResume" @change="onResumeUpload" />
        </label>

        <!-- Manual URL -->
        <div>
          <label class="text-xs text-slate-500 mb-1.5 block">Atau tempel URL langsung</label>
          <input v-model="form.resume" :class="inputClass" placeholder="https://..." />
        </div>
      </div>

      <!-- Contacts -->
      <div :class="sectionClass">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Kontak</p>
        <div v-for="field in ['email','phone','linkedin','youtube','github']" :key="field">
          <label class="text-sm font-medium text-slate-300 mb-1.5 block capitalize">{{ field }}</label>
          <input :value="getContact(field)" @input="setContact(field, $event)" :class="inputClass" />
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

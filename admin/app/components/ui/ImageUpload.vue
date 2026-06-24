<script setup lang="ts">
/* useRuntimeConfig, useAuth, useToast are Nuxt auto-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const props = defineProps<{ modelValue: string; folder?: string; oldUrl?: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
const config = useRuntimeConfig()
const { authHeaders } = useAuth()
const { error } = useToast()
const uploading = ref(false)

const MAX_SIZE = 2 * 1024 * 1024

const onFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > MAX_SIZE) { error('Ukuran file melebihi batas 2MB'); return }

  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', props.folder || 'projects')
    if (props.oldUrl) fd.append('old_url', props.oldUrl)
    const res = await fetch(`${config.public.apiUrl}/media/upload`, {
      method: 'POST', headers: authHeaders.value, body: fd,
    })
    if (!res.ok) {
      const json = await res.json() as { message?: string }
      error(json.message || 'Gagal upload gambar')
      return
    }
    const json = await res.json() as { data: { url: string } }
    emit('update:modelValue', json.data.url)
  } catch { error('Gagal upload gambar') }
  finally { uploading.value = false }
}

const onUrlInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const clearImage = () => emit('update:modelValue', '')
const onImgError = (e: Event) => { (e.target as HTMLImageElement).style.display = 'none' }
</script>

<template>
  <div class="space-y-3">
    <!-- Preview -->
    <div v-if="modelValue" class="relative inline-flex items-start gap-3 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <img :src="modelValue"
        class="h-20 w-auto rounded-lg object-cover"
        @error="onImgError" />
      <button type="button" @click="clearImage"
        class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-xs transition-colors shadow-sm">
        ×
      </button>
    </div>

    <!-- Upload button -->
    <label :class="['inline-flex items-center gap-2 cursor-pointer px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors',
      uploading
        ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed'
        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700']">
      <svg v-if="uploading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      {{ uploading ? 'Uploading...' : 'Pilih Gambar' }}
      <input type="file" accept="image/*" class="hidden" :disabled="uploading" @change="onFile" />
    </label>

    <!-- URL input -->
    <input :value="modelValue" @input="onUrlInput"
      placeholder="atau paste URL gambar langsung"
      class="input-field" />
  </div>
</template>

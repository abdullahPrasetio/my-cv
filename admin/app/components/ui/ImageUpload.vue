<script setup lang="ts">
const props = defineProps<{ modelValue: string; folder?: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
const config = useRuntimeConfig()
const { authHeaders } = useAuth()
const { error } = useToast()
const uploading = ref(false)

const onFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    form.append('folder', props.folder || 'projects')
    const res = await $fetch<{ data: { url: string } }>(`${config.public.apiUrl}/media/upload`, {
      method: 'POST',
      headers: authHeaders.value,
      body: form,
    })
    emit('update:modelValue', res.data.url)
  } catch {
    error('Gagal upload gambar')
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="space-y-2">
    <div v-if="modelValue" class="relative inline-block">
      <img :src="modelValue" class="h-20 w-auto rounded-lg object-cover opacity-80"
        @error="($event.target as HTMLImageElement).style.display='none'" />
    </div>
    <label class="flex items-center gap-2 cursor-pointer">
      <span :class="['px-3 py-1.5 text-xs rounded-lg transition-colors',
        uploading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600 text-slate-300']">
        {{ uploading ? 'Uploading...' : 'Pilih Gambar' }}
      </span>
      <input type="file" accept="image/*" class="hidden" :disabled="uploading" @change="onFile" />
      <span v-if="modelValue" class="text-xs text-slate-500 truncate max-w-[200px]">{{ modelValue }}</span>
    </label>
    <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="atau paste URL langsung"
      class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
  </div>
</template>

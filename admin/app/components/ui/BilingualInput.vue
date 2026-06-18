<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: { en: string; id: string }
  textarea?: boolean
  rows?: number
}>()
const emit = defineEmits<{ 'update:modelValue': [{ en: string; id: string }] }>()
const update = (lang: 'en' | 'id', val: string) =>
  emit('update:modelValue', { ...props.modelValue, [lang]: val })
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm font-medium text-slate-300">{{ label }}</p>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="text-xs text-slate-500 mb-1 block">EN</label>
        <textarea v-if="textarea" :value="modelValue.en" @input="update('en', ($event.target as HTMLTextAreaElement).value)"
          :rows="rows || 3"
          class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none resize-none" />
        <input v-else :value="modelValue.en" @input="update('en', ($event.target as HTMLInputElement).value)"
          class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
      </div>
      <div>
        <label class="text-xs text-slate-500 mb-1 block">ID</label>
        <textarea v-if="textarea" :value="modelValue.id" @input="update('id', ($event.target as HTMLTextAreaElement).value)"
          :rows="rows || 3"
          class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none resize-none" />
        <input v-else :value="modelValue.id" @input="update('id', ($event.target as HTMLInputElement).value)"
          class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
      </div>
    </div>
  </div>
</template>

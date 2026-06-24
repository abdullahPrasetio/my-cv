<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: { en: string; id: string }
  textarea?: boolean
  rows?: number
}>()
const emit = defineEmits<{ 'update:modelValue': [{ en: string; id: string }] }>()

const update = (lang: 'en' | 'id', e: Event) => {
  const val = (e.target as HTMLInputElement | HTMLTextAreaElement).value
  emit('update:modelValue', { ...props.modelValue, [lang]: val })
}
</script>

<template>
  <div class="space-y-2">
    <p class="text-sm font-medium text-body">{{ label }}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label class="text-xs text-muted mb-1 block font-medium">🇺🇸 English</label>
        <textarea v-if="textarea" :value="modelValue.en" @input="update('en', $event)"
          :rows="rows || 3"
          class="w-full input-field-sm resize-none" />
        <input v-else :value="modelValue.en" @input="update('en', $event)"
          class="w-full input-field-sm" />
      </div>
      <div>
        <label class="text-xs text-muted mb-1 block font-medium">🇮🇩 Indonesia</label>
        <textarea v-if="textarea" :value="modelValue.id" @input="update('id', $event)"
          :rows="rows || 3"
          class="w-full input-field-sm resize-none" />
        <input v-else :value="modelValue.id" @input="update('id', $event)"
          class="w-full input-field-sm" />
      </div>
    </div>
  </div>
</template>

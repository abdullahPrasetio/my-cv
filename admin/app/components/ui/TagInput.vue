<script setup lang="ts">
const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()
const input = ref('')

const add = () => {
  const val = input.value.replace(/,/g, '').trim()
  if (val && !props.modelValue.includes(val)) {
    emit('update:modelValue', [...props.modelValue, val])
  }
  input.value = ''
}

const remove = (i: number) => {
  const tags = [...props.modelValue]
  tags.splice(i, 1)
  emit('update:modelValue', tags)
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
  if (e.key === 'Backspace' && !input.value) remove(props.modelValue.length - 1)
}
</script>

<template>
  <div class="flex flex-wrap gap-1.5 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 min-h-[42px] focus-within:border-blue-500 transition-colors">
    <span v-for="(tag, i) in modelValue" :key="i"
      class="flex items-center gap-1 px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full">
      {{ tag }}
      <button type="button" @click="remove(i)" class="hover:text-red-400 leading-none">×</button>
    </span>
    <input v-model="input" @keydown="onKeydown" placeholder="Ketik + Enter"
      class="flex-1 min-w-[80px] bg-transparent text-sm text-slate-100 outline-none placeholder-slate-500" />
  </div>
</template>

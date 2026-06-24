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
  <div class="flex flex-wrap gap-1.5 min-h-10.5
              bg-white border border-slate-300 rounded-xl px-3 py-2
              dark:bg-slate-800 dark:border-slate-600
              focus-within:border-blue-500 dark:focus-within:border-blue-500
              transition-colors">
    <span v-for="(tag, i) in modelValue" :key="i"
      class="flex items-center gap-1 px-2.5 py-0.5
             bg-blue-100 text-blue-700 border border-blue-200
             dark:bg-blue-600/30 dark:text-blue-300 dark:border-transparent
             text-xs rounded-full font-medium">
      {{ tag }}
      <button type="button" @click="remove(i)"
        class="hover:text-red-500 dark:hover:text-red-400 leading-none ml-0.5 transition-colors">×</button>
    </span>
    <input v-model="input" @keydown="onKeydown" placeholder="Ketik + Enter"
      class="flex-1 min-w-[80px] bg-transparent text-sm outline-none
             text-slate-900 dark:text-slate-100
             placeholder-slate-400 dark:placeholder-slate-500" />
  </div>
</template>

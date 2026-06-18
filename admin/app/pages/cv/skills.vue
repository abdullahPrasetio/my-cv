<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { fetchCv, saveCv } = useCvApi()
const { success, error } = useToast()

interface Skill { name: string; level: number }
const skills = ref<Skill[]>([])
const loading = ref(false)
let fullCv: any = null

onMounted(async () => {
  try {
    fullCv = await fetchCv()
    skills.value = fullCv.skills ? JSON.parse(JSON.stringify(fullCv.skills)) : []
  } catch { error('Gagal memuat data CV') }
})

const add = () => skills.value.push({ name: '', level: 80 })
const remove = (i: number) => skills.value.splice(i, 1)
const moveUp = (i: number) => { if (i > 0) [skills.value[i-1], skills.value[i]] = [skills.value[i], skills.value[i-1]] }
const moveDown = (i: number) => { if (i < skills.value.length - 1) [skills.value[i], skills.value[i+1]] = [skills.value[i+1], skills.value[i]] }

const onSave = async () => {
  loading.value = true
  try {
    await saveCv({ ...fullCv, skills: skills.value })
    success('Skills berhasil disimpan!')
  } catch { error('Gagal menyimpan') } finally { loading.value = false }
}

const inputClass = 'bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none'
</script>

<template>
  <div class="p-8 max-w-2xl">
    <h2 class="text-2xl font-bold text-white mb-1">Skills</h2>
    <p class="text-slate-400 text-sm mb-8">Kemampuan teknis dengan level 0-100</p>

    <form @submit.prevent="onSave" class="space-y-3">
      <div v-for="(skill, i) in skills" :key="i"
        class="bg-slate-900 border border-slate-700/50 rounded-xl p-4">
        <div class="flex items-center gap-3 mb-3">
          <input v-model="skill.name" placeholder="Nama skill" :class="['flex-1', inputClass]" />
          <span class="text-sm text-blue-400 font-bold w-8 text-right">{{ skill.level }}</span>
          <button type="button" @click="moveUp(i)" class="text-slate-500 hover:text-slate-300 text-xs">↑</button>
          <button type="button" @click="moveDown(i)" class="text-slate-500 hover:text-slate-300 text-xs">↓</button>
          <button type="button" @click="remove(i)" class="text-slate-500 hover:text-red-400 text-sm transition-colors">×</button>
        </div>
        <input type="range" v-model.number="skill.level" min="0" max="100" class="w-full accent-blue-500" />
        <div class="mt-2 bg-slate-800 rounded-full h-1.5">
          <div class="bg-blue-500 h-1.5 rounded-full transition-all" :style="{ width: skill.level + '%' }" />
        </div>
      </div>

      <button type="button" @click="add"
        class="w-full py-3 border border-dashed border-slate-600 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-xl text-sm font-medium transition-colors">
        + Tambah Skill
      </button>
      <div class="flex justify-end pt-2">
        <UiSaveButton :loading="loading" />
      </div>
    </form>
  </div>
</template>

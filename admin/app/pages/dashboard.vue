<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { fetchCv } = useCvApi()
const { fetchConfig } = useConfigApi()
const { user, fetchMe } = useAuth()

const stats = reactive({ skills: 0, experience: 0, projects: 0, version: 'v1' })

onMounted(async () => {
  await fetchMe()
  try {
    const [cv, cfg] = await Promise.all([fetchCv(), fetchConfig()])
    stats.skills = cv.skills?.length ?? 0
    stats.experience = cv.experience?.length ?? 0
    stats.projects = cv.projects?.length ?? 0
    stats.version = cfg.default_version ?? 'v1'
  } catch {}
})

const cards = [
  { label: 'Skills', key: 'skills', icon: '⚡', to: '/cv/skills' },
  { label: 'Experience', key: 'experience', icon: '💼', to: '/cv/experience' },
  { label: 'Projects', key: 'projects', icon: '🚀', to: '/cv/projects' },
]
</script>

<template>
  <div class="p-8 max-w-3xl">
    <h2 class="text-2xl font-bold text-white mb-1">Dashboard</h2>
    <p class="text-slate-400 text-sm mb-8">Selamat datang, <span class="text-blue-400">{{ user?.username }}</span>!</p>

    <div class="grid grid-cols-3 gap-4 mb-8">
      <NuxtLink v-for="c in cards" :key="c.key" :to="c.to"
        class="bg-slate-900 border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/50 transition-colors">
        <div class="text-2xl mb-2">{{ c.icon }}</div>
        <div class="text-2xl font-bold text-white">{{ (stats as any)[c.key] }}</div>
        <div class="text-sm text-slate-400 mt-1">{{ c.label }}</div>
      </NuxtLink>
    </div>

    <div class="bg-slate-900 border border-slate-700/50 rounded-xl p-5">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Versi Portfolio Aktif</p>
          <p class="text-xl font-bold text-blue-400 mt-1">{{ stats.version.toUpperCase() }}</p>
        </div>
        <NuxtLink to="/settings"
          class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors">
          Ganti Versi
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

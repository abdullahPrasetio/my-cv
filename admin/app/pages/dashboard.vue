<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'

definePageMeta({ middleware: 'auth' })

const { fetchCv } = useCvApi()
const { fetchConfig } = useConfigApi()
const { user, fetchMe } = useAuth()
const config = useRuntimeConfig()

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

const displayName = computed(() => {
  const u = user.value as any
  return u?.name || u?.username || 'User'
})

const portfolioUrl = computed(() => {
  const username = user.value?.username
  return username ? `${config.public.portfolioUrl}/p/${username}` : config.public.portfolioUrl
})

const statCards = computed(() => [
  { label: 'Skills', value: stats.skills, to: '/cv/skills',
    color: 'from-yellow-500/20 to-orange-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>` },
  { label: 'Experience', value: stats.experience, to: '/cv/experience',
    color: 'from-blue-500/20 to-indigo-500/10', border: 'border-blue-500/20', text: 'text-blue-400',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>` },
  { label: 'Projects', value: stats.projects, to: '/cv/projects',
    color: 'from-emerald-500/20 to-teal-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
])

const quickLinks = [
  { to: '/cv/profile',    label: 'Profile & Avatar', sub: 'Nama, lokasi, kontak' },
  { to: '/cv/summary',   label: 'Summary',          sub: 'Deskripsi singkat' },
  { to: '/cv/skills',    label: 'Skills',           sub: 'Keahlian teknis' },
  { to: '/cv/experience',label: 'Experience',       sub: 'Riwayat kerja' },
  { to: '/cv/projects',  label: 'Projects',         sub: 'Portfolio proyek' },
  { to: '/cv/education', label: 'Education',        sub: 'Riwayat pendidikan' },
]
</script>

<template>
  <div class="p-8 max-w-4xl space-y-8">
    <!-- Welcome -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-white">Selamat datang, {{ displayName }} 👋</h2>
        <p class="text-sm text-slate-500 mt-1">Kelola konten portfolio kamu dari sini.</p>
      </div>
      <a :href="portfolioUrl" target="_blank"
        class="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Preview Portfolio
      </a>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4">
      <NuxtLink v-for="c in statCards" :key="c.key" :to="c.to"
        :class="['bg-linear-to-br p-5 rounded-2xl border transition-all hover:scale-[1.02] active:scale-[0.99]', c.color, c.border]">
        <div :class="['mb-3', c.text]" v-html="c.icon" />
        <div class="text-3xl font-black text-white mb-1">{{ c.value }}</div>
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ c.label }}</div>
      </NuxtLink>
    </div>

    <!-- Active version -->
    <div class="bg-white/3 border border-white/6 rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Versi Portfolio Aktif</p>
        <div class="flex items-center gap-3">
          <span class="text-3xl font-black text-white">{{ stats.version.toUpperCase() }}</span>
          <span class="px-2 py-1 bg-emerald-500/15 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">Live</span>
        </div>
        <a :href="portfolioUrl" target="_blank" class="text-xs text-slate-500 hover:text-slate-300 mt-1 inline-block transition-colors">
          {{ portfolioUrl }}
        </a>
      </div>
      <NuxtLink to="/settings"
        class="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium rounded-xl transition-colors">
        Ganti Versi
      </NuxtLink>
    </div>

    <!-- Quick links -->
    <div>
      <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Edit CV</p>
      <div class="grid grid-cols-2 gap-2">
        <NuxtLink v-for="item in quickLinks" :key="item.to" :to="item.to"
          class="flex items-center justify-between p-4 bg-white/3 hover:bg-white/6 border border-white/6 hover:border-white/10 rounded-xl transition-all group">
          <div>
            <p class="text-sm font-semibold text-slate-200">{{ item.label }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ item.sub }}</p>
          </div>
          <svg class="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

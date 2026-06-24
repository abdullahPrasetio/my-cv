<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const { user, logout } = useAuth()
const config = useRuntimeConfig()
const route = useRoute()

const userAny = computed(() => user.value as any)

const initials = computed(() => {
  const name = userAny.value?.name || user.value?.username || ''
  return name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

const displayName = computed(() => userAny.value?.name || user.value?.username || 'User')

const portfolioUrl = computed(() => {
  const username = user.value?.username
  return username ? `${config.public.portfolioUrl}/p/${username}` : config.public.portfolioUrl
})

const navGroups = [
  {
    label: 'Overview',
    links: [
      { path: '/dashboard', label: 'Dashboard', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
    ]
  },
  {
    label: 'CV Data',
    links: [
      { path: '/cv/profile', label: 'Profile', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>` },
      { path: '/cv/summary', label: 'Summary', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` },
      { path: '/cv/skills', label: 'Skills', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>` },
      { path: '/cv/experience', label: 'Experience', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>` },
      { path: '/cv/projects', label: 'Projects', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
      { path: '/cv/education', label: 'Education', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>` },
    ]
  },
  {
    label: 'Config',
    links: [
      { path: '/settings', label: 'Settings', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` },
    ]
  }
]

const isActive = (path: string) => route.path === path || route.path.startsWith(path + '/')
</script>

<template>
  <aside class="w-60 bg-[#0f1117] border-r border-white/6 flex flex-col h-screen sticky top-0 shrink-0">
    <!-- Brand -->
    <div class="px-5 pt-6 pb-4">
      <div class="flex items-center gap-2.5 mb-6">
        <div class="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">CV</div>
        <span class="text-sm font-bold text-white tracking-tight">Portfolio Admin</span>
      </div>

      <!-- User info -->
      <div class="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl border border-white/6">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0">
          {{ initials || '?' }}
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold text-white truncate">{{ displayName }}</p>
          <p class="text-[11px] text-slate-500 truncate">@{{ user?.username || '—' }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 overflow-y-auto space-y-4 pb-4">
      <div v-for="group in navGroups" :key="group.label">
        <p class="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2 mb-1.5">{{ group.label }}</p>
        <div class="space-y-0.5">
          <NuxtLink v-for="l in group.links" :key="l.path" :to="l.path"
            :class="['flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
              isActive(l.path)
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]']">
            <span class="shrink-0" v-html="l.icon" />
            {{ l.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Bottom actions -->
    <div class="p-3 border-t border-white/6 space-y-1">
      <a :href="portfolioUrl" target="_blank"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-150 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        Preview Portfolio
      </a>
      <button @click="logout"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

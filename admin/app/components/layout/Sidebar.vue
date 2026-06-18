<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()

const links = [
  { path: '/dashboard', label: 'Dashboard', icon: '▦' },
  { path: '/cv/profile', label: 'Profile', icon: '👤' },
  { path: '/cv/summary', label: 'Summary', icon: '📝' },
  { path: '/cv/skills', label: 'Skills', icon: '⚡' },
  { path: '/cv/experience', label: 'Experience', icon: '💼' },
  { path: '/cv/projects', label: 'Projects', icon: '🚀' },
  { path: '/cv/education', label: 'Education', icon: '🎓' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
]
</script>

<template>
  <aside class="w-56 bg-slate-900 border-r border-slate-700/50 flex flex-col h-screen sticky top-0">
    <div class="p-5 border-b border-slate-700/50">
      <p class="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">CV Admin</p>
      <p class="text-sm text-slate-300 font-medium truncate">{{ user?.username || user?.name || '—' }}</p>
    </div>

    <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <NuxtLink v-for="l in links" :key="l.path" :to="l.path"
        :class="['flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
          route.path === l.path || route.path.startsWith(l.path + '/')
            ? 'bg-blue-600/20 text-blue-300'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800']">
        <span class="text-base leading-none">{{ l.icon }}</span>
        {{ l.label }}
      </NuxtLink>
    </nav>

    <div class="p-3 border-t border-slate-700/50">
      <button @click="logout"
        class="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
        🚪 Logout
      </button>
    </div>
  </aside>
</template>

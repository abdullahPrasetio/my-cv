<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { fetchMe, user } = useAuth()

onMounted(async () => {
  if (!user.value) await fetchMe()
})

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/cv/profile': 'Profile',
    '/cv/summary': 'Summary',
    '/cv/skills': 'Skills',
    '/cv/experience': 'Experience',
    '/cv/projects': 'Projects',
    '/cv/education': 'Education',
    '/settings': 'Settings',
  }
  return map[route.path] || 'Admin'
})
</script>

<template>
  <div class="flex min-h-screen bg-[#0a0c10] text-slate-100">
    <LayoutSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar -->
      <header class="h-14 border-b border-white/6 flex items-center px-6 shrink-0 bg-[#0a0c10]/80 backdrop-blur sticky top-0 z-10">
        <h1 class="text-sm font-semibold text-slate-200">{{ pageTitle }}</h1>
      </header>
      <!-- Content -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
    <UiToast />
  </div>
</template>

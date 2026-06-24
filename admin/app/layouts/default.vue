<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const { fetchMe, user } = useAuth()
const { isDark, toggle, init } = useTheme()
const sidebarOpen = ref(false)

onMounted(async () => {
  init()
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

const closeSidebar = () => { sidebarOpen.value = false }
</script>

<template>
  <div class="flex min-h-screen app-shell">
    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/50 z-20 lg:hidden"
        @click="closeSidebar"
      />
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide">
      <div
        v-show="sidebarOpen"
        class="fixed inset-y-0 left-0 z-30 lg:hidden"
      >
        <LayoutSidebar @close="closeSidebar" />
      </div>
    </Transition>

    <!-- Desktop sidebar -->
    <div class="hidden lg:block shrink-0">
      <LayoutSidebar />
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar -->
      <header class="h-14 border-b flex items-center px-4 md:px-6 shrink-0 sticky top-0 z-10 app-header backdrop-blur divider">
        <!-- Hamburger (mobile) -->
        <button
          class="lg:hidden mr-3 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/6 text-slate-500 dark:text-slate-400 transition-colors"
          @click="sidebarOpen = !sidebarOpen"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <h1 class="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1">{{ pageTitle }}</h1>

        <!-- Theme toggle -->
        <button
          class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/6 text-slate-500 dark:text-slate-400 transition-colors"
          @click="toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- Sun icon (show in dark mode to switch to light) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon (show in light mode to switch to dark) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>

    <UiToast />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>

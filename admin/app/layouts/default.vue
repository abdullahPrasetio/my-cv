<template>
  <div class="flex min-h-screen bg-slate-950 text-slate-100">
    <LayoutSidebar />
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
    <UiToast />
  </div>
</template>

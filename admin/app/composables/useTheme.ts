export const useTheme = () => {
  const isDark = useState<boolean>('theme_dark', () => true)

  const apply = (dark: boolean) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('cv_theme', dark ? 'dark' : 'light')
    }
    isDark.value = dark
  }

  const init = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('cv_theme')
    if (saved) {
      apply(saved === 'dark')
    } else {
      apply(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }

  const toggle = () => apply(!isDark.value)

  return { isDark, toggle, init, apply }
}

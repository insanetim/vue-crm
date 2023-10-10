import localize from '@/utils/localize'

export default function appTitle(titleKey) {
  const appName = import.meta.env.VITE_TITLE

  return titleKey ? `${localize(titleKey)} | ${appName}` : appName
}

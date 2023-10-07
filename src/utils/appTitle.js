import localize from '@/utils/localize'

export default function appTitle(titleKey) {
  const appName = process.env.VUE_APP_TITLE

  return titleKey ? `${localize(titleKey)} | ${appName}` : appName
}

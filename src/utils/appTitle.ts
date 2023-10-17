import localize from '@/utils/localize'

function appTitle(): string
function appTitle(title: string): string
function appTitle(title?: string): string {
  const appName: string = import.meta.env.VITE_TITLE

  return title ? `${localize(title)} | ${appName}` : appName
}

export default appTitle

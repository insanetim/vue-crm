import { appName } from '@/constants'
import localize from '@/utils/localize'

function appTitle(): string
function appTitle(title: string): string
function appTitle(title?: string): string {
  return title ? `${localize(title)} | ${appName}` : appName
}

export default appTitle

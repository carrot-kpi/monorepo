import { lazy, Suspense } from 'react'
import { useDynamicScript } from '../../hooks/useDynamicScript'

interface KpiTokenProps {
  code: string
}

export const RemoteComponent = ({ code }: KpiTokenProps) => {
  const { ready, failed } = useDynamicScript(code)

  if (!ready) return <>Loading remote component...</>
  if (failed) return <>Failed Loading remote component</>

  const Page = lazy(async () => {
    await window.page.init(__webpack_share_scopes__.default)
    const factory = await window.page.get('./Page')
    const Module = factory()
    return { default: Module.Page }
  })

  return (
    <>
      <Suspense fallback="Loading...">
        <Page />
      </Suspense>
    </>
  )
}

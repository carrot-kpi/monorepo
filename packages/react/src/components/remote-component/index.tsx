import React from 'react'
import { lazy, Suspense } from 'react'
import { useDynamicScript } from '../../hooks/useDynamicScript'

interface KpiTokenProps {
  code: string
  scope: string
  component: string
  props: any
}

export const RemoteComponent = ({ code, scope, component, props }: KpiTokenProps) => {
  const { ready, failed } = useDynamicScript(code)

  if (!ready) return <>Loading remote component...</>
  if (failed) return <>Failed to load remote component</>

  const Component = lazy(async () => {
    await window[scope].init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(component)
    const Module = factory()
    return { default: Module[component] }
  })

  return (
    <>
      <Suspense fallback="Loading...">
        <Component props={props} />
      </Suspense>
    </>
  )
}

import { useEffect, useState } from 'react'

export const useDynamicScript = (code: string) => {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!code) return
    let cancelled = false
    let parsedCode = `data:text/javascript;base64,${btoa(code)}`
    import(parsedCode)
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch((error) => {
        console.error(error)
        if (!cancelled) setReady(false)
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [code])

  return { ready, failed }
}

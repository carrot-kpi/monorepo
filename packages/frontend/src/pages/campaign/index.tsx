import { ReactElement, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useKpiToken } from '@carrot-kpi/react'
import { RemoteComponent } from '../../components/remote-component'

export function Campaign(): ReactElement {
  const { address: kpiTokenAddress } = useParams()
  const { loading, kpiToken } = useKpiToken(kpiTokenAddress)

  const pageCode = useMemo(() => {
    if (loading || !kpiToken) return ''
    return kpiToken.template.specification.page
  }, [kpiToken, loading])

  return <RemoteComponent code={pageCode} />
}

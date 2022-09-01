import { useKpiTokenTemplates } from '@carrot-kpi/react'

export const Create = () => {
  const { loading, templates } = useKpiTokenTemplates()

  return (
    <>
      {loading && <>Loading...</>}
      {!loading && templates.length > 0 && (
        <ul>
          {templates.map((template: any) => (
            <>
              <ul key={template.address}>
                <li>Title: {template.specification.name}</li>
                <li>Version: {template.version.toString()}</li>
                <li>ID: {template.id.toString()}</li>
                <li>Description: {template.specification.description}</li>
              </ul>
              <button key={template.address + '-button'} onClick={() => {}}>
                Use
              </button>
            </>
          ))}
        </ul>
      )}
      {!loading && templates.length === 0 && <>No KPI token templates</>}
    </>
  )
}

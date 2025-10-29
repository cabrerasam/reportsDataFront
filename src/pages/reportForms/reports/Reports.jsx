import { useState, useEffect } from 'react'
import { UseData } from '../../../hooks/UseData'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const data = await UseData({ endpoint: 'report' })
        if (data.error) {
          setError(data.error)
        } else {
          setReports(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        setError('Error al cargar los reportes')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  console.log(reports)

  const handleViewReport = (reportId) => {
    // Aquí puedes agregar la lógica para navegar a la vista del reporte
    console.log('Ver reporte:', reportId)
    // Ejemplo: navigate(`/reports/${reportId}`)
  }

  const handleEditReport = (reportId) => {
    // Aquí puedes agregar la lógica para navegar a la edición del reporte
    console.log('Editar reporte:', reportId)
    // Ejemplo: navigate(`/reports/${reportId}/edit`)
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-lg'>Cargando reportes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-red-500 text-lg'>Error: {error}</div>
      </div>
    )
  }

  return (
    <main>
      <h1>Informes</h1>
      <section>
        <h2>Filtrar</h2>
        <p>{JSON.stringify(reports)}</p>
      </section>
      <section>
        {
          reports.length === 0
            ? (
              <p>No hay reportes disponibles.</p>
              )
            : (
                reports.map(report => (
                  <article key={report.id_report}>
                    <h3><span>Informe Nro</span> {report.num_report}</h3>
                    <p><span>Área: </span>{report.area_report}</p>
                    <p><span>Tipo de informe: </span>{report.type_report}</p>
                    <p><span>Fecha: </span>{report.date_report}</p>
                    <div>
                      <button onClick={() => handleViewReport(report.id_report)}>Ver</button>
                      <button onClick={() => handleEditReport(report.id_report)}>Editar</button>
                    </div>
                  </article>
                ))
              )
        }
      </section>
    </main>
  )
}

export default Reports

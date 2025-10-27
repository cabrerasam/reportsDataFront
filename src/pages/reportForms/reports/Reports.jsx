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
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Lista de Reportes</h1>
        <div className='text-sm text-gray-600'>
          Total: {reports.length} reporte{reports.length !== 1 ? 's' : ''}
        </div>
      </div>

      {reports.length === 0
        ? (
          <div>
            <div>No hay reportes disponibles</div>
            <p>Los reportes aparecerán aquí cuando estén disponibles.</p>
          </div>
          )
        : (
          <div>
            {reports.map((report) => (
              <div key={report.id || report._id}>
                <div>
                  <div>
                    <h3>
                      {report.title || report.name || `Reporte #${report.id_report || report._id}`}
                    </h3>

                    {report.description && (
                      <p>
                        {report.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <button onClick={() => handleViewReport(report.id_report || report._id)}>
                      Ver
                    </button>

                    <button onClick={() => handleEditReport(report.id_reportº || report._id)}>
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
    </div>
  )
}

export default Reports

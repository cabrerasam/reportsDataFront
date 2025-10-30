import { useState, useEffect } from 'react'
import { UseData } from '../../../hooks/UseData'
import { URL } from '../../../helpers/config.js'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [issuesMap, setIssuesMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchIssues = async (reportId) => {
    try {
      const data = await UseData({ endpoint: `issues/${reportId}` })
      if (!data.error) {
        setIssuesMap(prev => ({
          ...prev,
          [reportId]: data
        }))
      }
    } catch (err) {
      console.error('Error fetching issues for report:', reportId, err)
    }
  }

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

  useEffect(() => {
    if (reports.length > 0) {
      reports.forEach(report => fetchIssues(report.id_report))
    }
  }, [reports])

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
    <main className='w-3/4 mx-auto mt-4 flex flex-col justify-center'>
      <h1 className='text-center text-white text-2xl font-semibold'>Informes</h1>
      <section className='w-full bg-cyan-800 p-4 rounded-md mb-6 shadow-md'>
        <h2 className='text-white text-center'>Filtrar</h2>
      </section>
      <section className='w-full grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4'>
        {
          reports.length === 0
            ? (
              <p>No hay reportes disponibles.</p>
              )
            : (
                reports.map(report => (
                  <article key={report.id_report} className='bg-cyan-800 text-white p-6 rounded-lg shadow-md'>
                    <h3 className=''>Informe: {report.num_report}</h3>
                    <p><span>Área: </span>{report.area_report}</p>
                    <p><span>Tipo de informe: </span>{report.type_report}</p>
                    <p><span>Prioridad: </span>{report.priority_report}</p>
                    <p><span>Fecha: </span>{report.date_report}</p>
                    <div className=''>
                      <h4 className=''>Temas / noticias relacionados:</h4>
                      {issuesMap[report.id_report]
                        ? (
                          <ul className=''>
                            {issuesMap[report.id_report].map(issue => (
                              <li key={issue.id_issues_report} className=''>
                                {issue.issue_report || 'Sin título'}
                              </li>
                            ))}
                          </ul>
                          )
                        : (
                          <p className='text-gray-500'>Cargando issues...</p>
                          )}
                    </div>
                    <a href={`${URL}${report.link_report}`}>Ver informe</a>
                    <p onClick={handleEditReport}>Editar informe</p>
                  </article>
                ))
              )
        }
      </section>
    </main>
  )
}

export default Reports

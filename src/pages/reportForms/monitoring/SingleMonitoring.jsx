import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const SingleMonitoring = () => {
  const { id } = useParams()
  const [monitoring, setMonitoring] = useState([])
  const [individualMonitoring, setIndividualMonitoring] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [collectiveMonitoring, setCollectiveMonitoring] = useState([])
  const [collectives, setCollectives] = useState([])
  const [issues, setIssues] = useState([])

  useEffect(() => {
    fetch(`${URL}/monitoring`)
      .then(res => res.json())
      .then(data => setMonitoring(data.filter(monit => monit.id_monitoring === id)))
      .catch(error => error)
  }
  , [id])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualMonitoring`)
      .then(res => res.json())
      .then(data => setIndividualMonitoring(data.filter(indMonit => indMonit.id_monitoring === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => setIndividuals(data.filter(ind => ind.id_individual === individualMonitoring[0].id_individual)))
      .catch(error => error)
  }, [individualMonitoring])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveMonitoring`)
      .then(res => res.json())
      .then(data => setCollectiveMonitoring(data.filter(colMonit => colMonit.id_monitoring === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => setCollectives(data.filter(col => col.id_collective === collectiveMonitoring[0].id_collective)))
      .catch(error => error)
  }, [collectiveMonitoring])

  useEffect(() => {
    fetch(`${URL}/issues`)
      .then(res => res.json())
      .then(data => setIssues(data.filter(issue => issue.id_report === id)))
      .catch(error => error)
  }, [id])

  return (
    <main className='w-full h-full pt-[60px] pb-4'>
      <section className='mr-auto ml-auto w-2/3 grid grid-cols-2 gap-4'>
        <div className='text-white bg-custom-transparent overflow-hidden h-[500px] p-8'>
          <h3 className='text-center font-bold text-cyan-500 text-xl'>Informe de monitoreo</h3>
          {
            monitoring.map((monit, index) => (
              <div key={index} className='flex flex-col gap-2 text-white'>
                <p><span className='text-cyan-500'>Tipo de informe: </span>{monit.type_monitoring}</p>
                <p><span className='text-cyan-500'>Prioridad: </span>{monit.priority_monitoring}</p>
                <p><span className='text-cyan-500'>Confidencialidad: </span>{monit.confidentiality_monitoring}</p>
                <p><span className='text-cyan-500'>Nro de informe: </span>{monit.num_monitoring}</p>
                <p><span className='text-cyan-500'>Fecha del informe: </span>{dateConvert(monit.date_monitoring)}</p>
                <p className='text-center text-cyan-500'>Temáticas: </p>
                {
                  issues.map((issue, index) => (
                    <div key={index} className='flex justify-center gap-2 text-white'>
                      <p>{index + 1}:</p>
                      <p><span className='text-cyan-500'>Tema: </span>{issue.issue_report}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <p><span className='text-cyan-500'>Prioridad: </span>{issue.intensity_issues_report}</p>
                    </div>
                  ))
                }
                <a href={`${URL}${monit.link_monitoring}`} className='bg-custom-red px-4 py-1 text-center mt-4'>Abrir informe</a>
              </div>
            ))
          }
        </div>
        <section className='flex flex-col gap-4'>
          <div className='text-white bg-custom-transparent h-[300px] p-8'>
            <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos individuales</h2>
            {
              individuals.map((ind, index) => (
                <div key={index} className='grid grid-cols-11 text-white overflow-auto mt-2'>
                  <p className='col-span-1'>{index + 1}: </p>
                  <p className='col-span-7'><span className='text-cyan-500 font-bold'>Nombre: </span>{ind.name_individual}</p>
                  <div className='justify-self-center w-px h-[30px] bg-cyan-900' />
                  <Link to={`/individuals/${ind.id_individual}`} className='bg-custom-red px-4 py-1 col-span-2 justify-self-center'>Ver</Link>
                </div>
              ))
            }
          </div>
          <div className='text-white bg-custom-transparent overflow-hidden h-[300px] p-8'>
            <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos colectivos</h2>
            {
              collectives.map((col, index) => (
                <div key={index} className='grid grid-cols-11 text-white overflow-auto mt-2'>
                  <p className='col-span-1'>{index + 1}: </p>
                  <p className='col-span-7'><span className='text-cyan-500 font-bold'>Nombre: </span>{col.name_collective}</p>
                  <div className='justify-self-center w-px h-[30px] bg-cyan-900' />
                  <Link to={`/collectives/${col.id_collective}`} className='bg-custom-red px-4 py-1 col-span-2 justify-self-center'>Ver</Link>
                </div>
              ))
            }
          </div>
        </section>
      </section>
    </main>
  )
}

export default SingleMonitoring

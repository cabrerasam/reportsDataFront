import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'

const SingleWeekly = () => {
  const URL = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const [weekly, setWeekly] = useState([])
  const [individualWeekly, setIndividualWeekly] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [collectiveWeekly, setCollectiveWeekly] = useState([])
  const [collectives, setCollectives] = useState([])
  const [issues, setIssues] = useState([])

  useEffect(() => {
    fetch(`${URL}/weekly`)
      .then(res => res.json())
      .then(data => setWeekly(data.filter(weekly => weekly.id_weekly === id)))
      .catch(error => error)
  }
  , [id])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualWeekly`)
      .then(res => res.json())
      .then(data => setIndividualWeekly(data.filter(indWeekly => indWeekly.id_weekly === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => setIndividuals(data.filter(ind => ind.id_individual === individualWeekly[0].id_individual)))
      .catch(error => error)
  }, [individualWeekly])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveWeekly`)
      .then(res => res.json())
      .then(data => setCollectiveWeekly(data.filter(colWeekly => colWeekly.id_weekly === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => setCollectives(data.filter(col => col.id_collective === collectiveWeekly[0].id_collective)))
      .catch(error => error)
  }, [collectiveWeekly])

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
          <h3 className='text-center font-bold text-cyan-500 text-xl'>Informe semanal</h3>
          {
            weekly.map((week, index) => (
              <div key={index} className='flex flex-col gap-2 text-white'>
                <p><span className='text-cyan-500'>Confidencialidad: </span>{week.confidentiality_weekly}</p>
                <p><span className='text-cyan-500'>Nro de informe: </span>{week.num_weekly}</p>
                <p><span className='text-cyan-500'>Fecha del informe: </span>{dateConvert(week.date_weekly)}</p>
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
                <a href={`${URL}${week.link_weekly}`} className='bg-custom-red px-4 py-1 text-center mt-4'>Abrir informe</a>
              </div>
            ))
          }
        </div>
        <section className='flex flex-col gap-4'>
          <div className='text-white bg-custom-transparent overflow-hidden h-[300px] p-8'>
            <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos individuales</h2>
            {
              individuals.map((ind, index) => (
                <div key={index} className='flex items-center justify-center gap-2 text-white'>
                  <p>{index + 1}: </p>
                  <p><span className='text-cyan-500 font-bold'>Nombre: </span>{ind.name_individual}</p>
                  <div className='w-px h-[30px] bg-cyan-900' />
                  <Link to={`/individuals/${ind.id_individual}`} className='bg-custom-red px-4 py-1'>Ver</Link>
                </div>
              ))
            }
          </div>
          <div className='text-white bg-custom-transparent overflow-hidden h-[300px] p-8'>
            <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos colectivos</h2>
            {
              collectives.map((col, index) => (
                <div key={index} className='flex items-center justify-center gap-2 text-white'>
                  <p>{index + 1}: </p>
                  <p><span className='text-cyan-500 font-bold'>Nombre: </span>{col.name_collective}</p>
                  <div className='w-px h-[30px] bg-cyan-900' />
                  <Link to={`/collectives/${col.id_collective}`} className='bg-custom-red px-4 py-1 mt-2'>Ver</Link>
                </div>
              ))
            }
          </div>
        </section>
      </section>
    </main>
  )
}

export default SingleWeekly

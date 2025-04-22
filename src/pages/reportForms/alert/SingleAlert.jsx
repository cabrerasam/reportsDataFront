import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const SingleAlert = () => {
  const { id } = useParams()
  const [alert, setAlert] = useState([])
  const [individualAlert, setIndividualAlert] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [collectiveAlert, setCollectiveAlert] = useState([])
  const [collectives, setCollectives] = useState([])

  useEffect(() => {
    fetch(`${URL}/alerts`)
      .then(res => res.json())
      .then(data => setAlert(data.filter(diary => diary.id_alert === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualAlert`)
      .then(res => res.json())
      .then(data => setIndividualAlert(data.filter(indAlert => indAlert.id_alert === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => setIndividuals(data.filter(ind => ind.id_individual === individualAlert[0].id_individual)))
      .catch(error => error)
  }, [individualAlert])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveAlert`)
      .then(res => res.json())
      .then(data => setCollectiveAlert(data.filter(colAlert => colAlert.id_alert === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => setCollectives(data.filter(col => col.id_collective === collectiveAlert[0].id_collective)))
      .catch(error => error)
  }, [collectiveAlert])

  return (
    <main className='w-full h-full pt-[60px] pb-4'>
      <section className='mr-auto ml-auto w-2/3 grid grid-cols-2 gap-4'>
        <div className='text-white bg-custom-transparent overflow-hidden h-[500px] p-8'>
          <h3 className='text-center font-bold text-cyan-500 text-xl'>Informe Alerta</h3>
          {
            alert.map((al, index) => (
              <div key={index} className='flex flex-col gap-2 text-white'>
                <p><span className='text-cyan-500'>Tipo de informe: </span>{al.type_alert}</p>
                <p><span className='text-cyan-500'>Prioridad: </span>{al.priority_alert}</p>
                <p><span className='text-cyan-500'>Confidencialidad: </span>{al.confidentiality_alert}</p>
                <p><span className='text-cyan-500'>Nro de informe: </span>{al.num_alert}</p>
                <p><span className='text-cyan-500'>Fecha del informe: </span>{dateConvert(al.date_alert)}</p>
                <p><span className='text-cyan-500'>Temas del informe: </span>{al.issue_alert}</p>
                <a href={`${URL}${al.link_alert}`} className='bg-custom-red px-4 py-1 text-center mt-4' target='_blanck'>Abrir informe</a>
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

export default SingleAlert

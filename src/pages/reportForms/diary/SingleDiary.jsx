import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const SingleDiary = () => {
  const { id } = useParams()
  const [diary, setDiary] = useState([])
  const [individualDiary, setIndividualDiary] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [collectiveDiary, setCollectiveDiary] = useState([])
  const [collectives, setCollectives] = useState([])

  useEffect(() => {
    fetch(`${URL}/diaries`)
      .then(res => res.json())
      .then(data => setDiary(data.filter(diary => diary.id_diary === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualDiaries`)
      .then(res => res.json())
      .then(data => setIndividualDiary(data.filter(indDiary => indDiary.id_diary === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => {
        setIndividuals(data)
      })
      .catch(error => error)
  }, [individualDiary])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveDiaries`)
      .then(res => res.json())
      .then(data => setCollectiveDiary(data.filter(colDiary => colDiary.id_diary === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => setCollectives(data))
      .catch(error => error)
  }, [collectiveDiary])

  return (
    <main className='w-full h-full pt-[60px] pb-4'>
      <section className='mr-auto ml-auto w-2/3 grid grid-cols-2 gap-4'>
        <div className='text-white bg-custom-transparent overflow-hidden h-[500px] p-8'>
          <h3 className='text-center font-bold text-cyan-500 text-xl'>Informe diario</h3>
          {
            diary.map((day, index) => (
              <div key={index} className='flex flex-col gap-2 text-white'>
                <p><span className='text-cyan-500'>Tipo de informe: </span>{day.type_diary}</p>
                <p><span className='text-cyan-500'>Prioridad: </span>{day.priority_diary}</p>
                <p><span className='text-cyan-500'>Confidencialidad: </span>{day.confidentiality_diary}</p>
                <p><span className='text-cyan-500'>Nro de informe: </span>{day.num_diary}</p>
                <p><span className='text-cyan-500'>Fecha del informe: </span>{dateConvert(day.date_diary)}</p>
                <p><span className='text-cyan-500'>Temas del informe: </span>{day.issue_diary}</p>
                <a href={`${URL}${day.link_diary}`} className='bg-custom-red px-4 py-1 text-center mt-4' target='_blanck'>Abrir informe</a>
              </div>
            ))
          }
        </div>
        <section className='flex flex-col gap-4'>
          <div className='text-white bg-custom-transparent h-[300px] p-8'>
            <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos individuales</h2>
            {
              individualDiary.map((ind, index) => (
                <div key={index} className='grid grid-cols-11 text-white overflow-auto mt-2'>
                  <p className='col-span-1'>{index + 1}: </p>
                  <p className='col-span-7'><span className='text-cyan-500 font-bold'>Nombre: </span>{individuals.find(indi => indi.id_individual === ind.id_individual).name_individual}</p>
                  <div className='w-px h-[30px] bg-cyan-900 justify-self-center' />
                  <Link to={`/individuals/${ind.id_individual}`} className='bg-custom-red px-4 py-1 col-span-2 justify-self-center'>Ver</Link>
                </div>
              ))
            }
          </div>
          <div className='text-white bg-custom-transparent h-[300px] p-8'>
            <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos colectivos</h2>
            {
              collectives.map((col, index) => (
                <div key={index} className='grid grid-cols-11 text-white overflow-auto mt-2'>
                  <p className='col-span-1'>{index + 1}: </p>
                  <p className='col-span-7'><span className='text-cyan-500 font-bold'>Nombre: </span>{collectives.find(cole => cole.id_collective === col.id_collective).name_collective}</p>
                  <div className='w-px h-[30px] bg-cyan-900 justify-self-center' />
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

export default SingleDiary

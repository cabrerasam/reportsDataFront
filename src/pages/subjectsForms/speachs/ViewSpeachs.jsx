import { useState, useEffect } from 'react'
import { dateConvert } from '../../../helpers/dateConvert'
import { Link } from 'react-router-dom'
import { URL } from '../../../helpers/config'

const ViewSpeachs = () => {
  const [speachs, setSpeachs] = useState([])
  const [individuals, setIndividuals] = useState([])

  useEffect(() => {
    fetch(`${URL}/speachs`)
      .then(res => res.json())
      .then(data => setSpeachs(data))
      .catch(error => error)
  }, [])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => {
        setIndividuals(data)
      })
      .catch(error => error)
  }, [])

  const individualName = (id) => {
    const individual = individuals.find(individual => individual.id_individual === id)
    return individual ? individual.name_individual : 'Autor desconocido'
  }

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Discursos</h1>
      <ul className='w-3/4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 '>
        {speachs.map((speach, index) => (
          <li key={index} className='text-white flex items-center place-self-center'>
            <div className='flex flex-col w-[420px] gap-1 bg-custom-transparent px-4 py-4'>
              <p><span className='text-cyan-500 font-bold'>Discurso: </span>{speach.title_speach}</p>
              <p><span className='text-cyan-500 font-bold'>Autor: </span>{individualName(speach.id_individual)}</p>
              <p><span className='text-cyan-500 font-bold'>Fecha: </span>{dateConvert(speach.date_speach)}</p>
              <Link to={`${URL}${speach.speach}`} className='text-center bg-cyan-500 w-28 px-4 mt-2' target='_blanck'>Abrir</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ViewSpeachs

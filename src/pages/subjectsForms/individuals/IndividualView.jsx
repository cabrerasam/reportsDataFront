import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../../../helpers/config'

const IndividualView = () => {
  const [individuals, setIndividuals] = useState([])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => {
        setIndividuals(data)
      })
      .catch(error => console.error('Error fetching individuals:', error))
  }, [])

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Lista de personajes</h1>
      <ul className='w-3/4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 '>
        {individuals.map((individual, index) => (
          <li key={index} className='text-white flex items-center place-self-center'>
            <div className='w-[120px] h-[150px]'>
              <img className='object-cover w-full h-full' src={`${URL}${individual.photo_individual}`} alt={individual.name_individual} />
            </div>
            <div className='flex flex-col w-[330px] h-[150px] gap-1 bg-custom-transparent px-4 py-4'>
              <p><span className='text-cyan-500 font-bold'>Nombre: </span>{individual.name_individual}</p>
              <p><span className='text-cyan-500 font-bold'>Nacionalidad: </span>{individual.nationality_individual}</p>
              <p><span className='text-cyan-500 font-bold'>Partido político: </span>{individual.party_individual}</p>
              <div className='flex justify-around'>
                <Link to={`/individuals/${individual.id_individual}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Ver más</Link>
                <Link to={`/individual/${individual.id_individual}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Actualizar</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndividualView

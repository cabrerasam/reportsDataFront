import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../../../helpers/config'

const CollectiveView = () => {
  const [collectives, setCollectives] = useState([])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCollectives(data)
      })
      .catch(error => console.error('Error fetching collectives:', error))
  }, [])

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Lista de personajes</h1>
      <ul className='w-3/4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 '>
        {collectives.map((collective, index) => (
          <li key={index} className='text-white flex items-center place-self-center'>
            <div className='flex flex-col w-[420px] gap-1 bg-custom-transparent px-4 py-4'>
              <p><span className='text-cyan-500 font-bold'>Nombre: </span>{collective.name_collective}</p>
              <p><span className='text-cyan-500 font-bold'>Nacionalidad: </span>{collective.type_collective}</p>
              <p><span className='text-cyan-500 font-bold'>Partido político: </span>{collective.description_collective}</p>
              <div className='flex justify-around'>
                <Link to={`/collectives/${collective.id_collective}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Ver más</Link>
                <Link to={`/collective/${collective.id_collective}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Actualizar</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default CollectiveView

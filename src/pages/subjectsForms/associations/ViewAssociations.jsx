import { useState, useEffect } from 'react'
import { URL } from '../../../helpers/config'

const ViewAssociations = () => {
  const [associations, setAssociations] = useState([])

  useEffect(() => {
    fetch(`${URL}/associations`)
      .then(res => res.json())
      .then(data => setAssociations(data))
      .catch(error => error)
  }, [])

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Asociaciones</h1>
      <ul className='w-3/4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 '>
        {associations.map((association, index) => (
          <li key={index} className='text-white flex items-center place-self-center'>
            <div className='flex flex-col w-[330px] gap-1 bg-custom-transparent px-4 py-4'>
              <p><span className='text-cyan-500 font-bold'>Asociación: </span>{association.association}</p>
              <a href={`/associationList/${association.id_association}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Abrir</a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ViewAssociations

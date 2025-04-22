import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { URL } from '../../../helpers/config'

const SingleAssociation = () => {
  const { id } = useParams()
  const [association, setAssociation] = useState({})
  const [subjectAssociation, setSubjectAssociation] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [collectives, setCollectives] = useState([])

  useEffect(() => {
    fetch(`${URL}/associations/${id}`)
      .then(res => res.json())
      .then(data => {
        setAssociation(data[0])
      })
      .catch(error => console.log(error))
  }, [id])

  useEffect(() => {
    fetch(`${URL}/subjects`)
      .then(res => res.json())
      .then(data => setSubjectAssociation(data.filter(subject => subject.id_association === id)))
      .catch(error => error)
  }, [id])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => {
        const relatedIndividuals = data.filter(ind =>
          subjectAssociation.some(subject => subject.id_subject === ind.id_individual)
        )
        setIndividuals(relatedIndividuals)
      })
      .catch(error => error)
  }, [subjectAssociation])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => {
        const relatedCollectives = data.filter(col =>
          subjectAssociation.some(subject => subject.id_subject === col.id_collective)
        )
        setCollectives(relatedCollectives)
      })
      .catch(error => error)
  }, [subjectAssociation])

  return (
    <main className='flex w-screen justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>{association.association}</h1>
      <section className='flex w-full justify-center gap-4 h-[600px] overflow-auto'>
        <div className='text-white bg-custom-transparent overflow-hidden p-8'>
          <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos individuales</h2>
          {
            individuals.map((ind, index) => (
              <div key={index} className='w-[420px] flex items-center justify-center gap-2 text-white mb-4'>
                <p>{index + 1}: </p>
                <p><span className='text-cyan-500 font-bold'>Nombre: </span>{ind.name_individual}</p>
                <div className='w-px h-[30px] bg-cyan-900' />
                <Link to={`/individuals/${ind.id_individual}`} className='bg-custom-red px-4 py-1'>Ver</Link>
              </div>
            ))
          }
        </div>
        <div className='text-white bg-custom-transparent overflow-hidden p-8'>
          <h2 className='text-xl text-center text-cyan-500 font-bold mb-4'>Sujetos colectivos</h2>
          {
            collectives.map((col, index) => (
              <div key={index} className='w-[420px] flex items-center justify-center gap-2 text-white mb-4'>
                <p>{index + 1}: </p>
                <p><span className='text-cyan-500 font-bold'>Nombre: </span>{col.name_collective}</p>
                <div className='w-px h-[30px] bg-cyan-900' />
                <Link to={`/collectives/${col.id_collective}`} className='bg-custom-red px-4 py-1 mt-2'>Ver</Link>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  )
}

export default SingleAssociation

import { useState, useEffect } from 'react'
import ButtonDark from '../../../components/atoms/ButtonDark'
import { URL } from '../../../helpers/config'

const AssociationJoin = () => {
  const [individuals, setIndividuals] = useState([])
  const [collectives, setCollectives] = useState([])
  const [associations, setAssociations] = useState([])
  const [joinIndividual, setJoinIndividual] = useState('')
  const [joinCollective, setJoinCollective] = useState('')

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => setIndividuals(data))
      .catch(error => error)
  }, [])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => setCollectives(data))
      .catch(error => error)
  }, [])

  useEffect(() => {
    fetch(`${URL}/associations`)
      .then(res => res.json())
      .then(data => setAssociations(data))
      .catch(error => error)
  }, [])

  useEffect(() => {
    if (joinIndividual) {
      const timer = setTimeout(() => setJoinIndividual(''), 2000)
      return () => clearTimeout(timer)
    }
  }, [joinIndividual])

  useEffect(() => {
    if (joinCollective) {
      const timer = setTimeout(() => setJoinCollective(''), 2000)
      return () => clearTimeout(timer)
    }
  }, [joinCollective])

  const submitIndividual = (e) => {
    e.preventDefault()

    const body = {
      idSubject: e.target.individual.value,
      idAssociation: e.target.association.value
    }

    fetch(`${URL}/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setJoinIndividual(data[0].insert_subjects_associations.message)
        setTimeout(() => {
          setJoinIndividual('')
        }, 2000)
      })
      .catch(error => error)
  }

  const submitCollective = (e) => {
    e.preventDefault()

    const body = {
      idSubject: e.target.collective.value,
      idAssociation: e.target.association.value
    }

    fetch(`${URL}/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setJoinCollective(data[0].insert_subjects_associations.message)
        setTimeout(() => {
          setJoinCollective('')
        }, 2000)
      })
      .catch(error => error)
  }
  return (
    <main className='w-full h-full flex items-center justify-center gap-8 pt-40'>
      <form onSubmit={submitIndividual} className='bg-cyan-800 p-3'>
        <h1 className='text-2xl text-center mb-3 text-white'>Actor individual</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Actor
              <select name='individual' className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]'>
                <option>Seleccionar</option>
                {
                  individuals.map(individual => (
                    <option key={individual.id_individual} value={individual.id_individual}>{individual.name_individual}</option>
                  ))
                }
              </select>
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Asociación
              <select name='association' className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]'>
                <option>Seleccionar</option>
                {
                  associations.map(association => (
                    <option key={association.id_association} value={association.id_association}>{association.association}</option>
                  ))
                }
              </select>
            </label>
          </fieldset>
        </section>
        <section className='flex justify-center'>
          <ButtonDark
            textButton='Enviar'
            typeButton='submit'
          />
        </section>
        <p className='text-center mt-4 text-green-500'>{joinIndividual ? 'Creado satisfactoriamente' : ''}</p>
      </form>
      <form onSubmit={submitCollective} className='bg-cyan-800 p-3'>
        <h1 className='text-2xl text-center mb-3 text-white'>Actor colectivo</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Actor
              <select name='collective' className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]'>
                <option>Seleccionar</option>
                {
                  collectives.map(collective => (
                    <option key={collective.id_collective} value={collective.id_collective}>{collective.name_collective}</option>
                  ))
                }
              </select>
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Asociación
              <select name='association' className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]'>
                <option>Seleccionar</option>
                {
                  associations.map(association => (
                    <option key={association.id_association} value={association.id_association}>{association.association}</option>
                  ))
                }
              </select>
            </label>
          </fieldset>
        </section>
        <section className='flex justify-center'>
          <ButtonDark
            textButton='Enviar'
            typeButton='submit'
          />
        </section>
        <p className='text-center mt-4 text-green-500'>{joinCollective ? 'Creado satisfactoriamente' : ''}</p>
      </form>
    </main>
  )
}

export default AssociationJoin

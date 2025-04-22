/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { useState, useEffect } from 'react'
import InputFile from '../../../components/atoms/InputFile'
import ButtonLight from '../../../components/atoms/ButtonLight'
import Input from '../../../components/atoms/Input'
import { URL } from '../../../helpers/config'

const Weekly = () => {
  const [attribute, setAttribute] = useState('one')
  const [ngoweekly, setNgoWeekly] = useState({})
  const [issues, setIssues] = useState('')
  const [individuals, setIndividuals] = useState([])
  const [collectives, setCollectives] = useState([])
  const [individualNgoWeekly, setIndividualNgoWeekly] = useState('')
  const [collectiveNgoWeekly, setCollectiveNgoWeekly] = useState('')
  const [idUser, setIdUser] = useState('')

  useEffect(() => {
    fetch(`${URL}/login/authorized`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIdUser(data.user.idUser)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  useEffect(() => {
    fetch(`${URL}/individuals`)
      .then(res => res.json())
      .then(data => {
        setIndividuals(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => {
        setCollectives(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  const submitForm = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('numNgoWeekly', e.target.num.value)
    formData.append('dateNgoWeekly', e.target.date.value)
    formData.append('file', e.target.file.files[0])
    formData.append('idUser', idUser)

    fetch(`${URL}/ngoweekly`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setNgoWeekly(data[0])
        setAttribute('block')
      })
      .catch(error => error)
  }

  const submitIssue = (e) => {
    e.preventDefault()
    const body = {
      issueReport: e.target.issue.value,
      intensityIssue: e.target.intensity.value,
      idReport: ngoweekly.id_ngo_weekly
    }

    fetch(`${URL}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setIssues(data[0].create_issues_report.message)
      })
      .catch(error => console.error('Error:', error))
  }

  const submiteIndividual = (e) => {
    e.preventDefault()

    const body = {
      idSubject: e.target.individual.value,
      idReport: ngoweekly.id_ngo_weekly
    }

    fetch(`${URL}/intermediate/individualNgoWeekly`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setIndividualNgoWeekly(data[0].insert_individuals_ngo_weekly.message)
      })
      .catch(error => error)
  }

  const submiteCollective = (e) => {
    e.preventDefault()

    const body = {
      idSubject: e.target.collective.value,
      idReport: ngoweekly.id_ngo_weekly
    }

    fetch(`${URL}/intermediate/collectiveNgoWeekly`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setCollectiveNgoWeekly(data[0].insert_collectives_ngo_weekly.message)
      })
      .catch(error => error)
  }

  return (
    <main className='ml-auto mr-auto w-2/3 h-full grid pt-[60px] place-items-center'>
      <section className='flex w-[600px] h-[30px] relative text-center cursor-pointer text-white'>
        <div className={`flex-grow pt-1 ${attribute === 'one' ? 'bg-cyan-950' : 'bg-cyan-700'}`} onClick={() => setAttribute('one')}>Paso 1</div>
        <div className={`flex-grow pt-1 ${attribute === 'two' ? 'bg-cyan-950' : 'bg-cyan-700'}`} onClick={() => setAttribute('two')}>Paso 2</div>
        <div className={`flex-grow pt-1 ${attribute === 'three' ? 'bg-cyan-950' : 'bg-cyan-700'}`} onClick={() => setAttribute('three')}>Paso 3</div>
        <div className={`flex-grow pt-1 ${attribute === 'four' ? 'bg-cyan-950' : 'bg-cyan-700'}`} onClick={() => setAttribute('four')}>Paso 4</div>
      </section>
      <section className='flex justify-center items-center w-[600px] h-[430px] relative overflow-hidden'>
        <form onSubmit={submitForm} className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] one' style={{ left: attribute === 'one' ? '0' : '-600px' }}>
          <h1 className='text-2xl text-center mb-3 text-white'>Semanal ONG</h1>
          <section className='flex gap-4 mb-4'>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <Input
                textLabel='Número de informe'
                nameInput='num'
                typeInput='text'
              />
              <Input
                textLabel='Fecha del informe'
                nameInput='date'
                typeInput='date'
              />
              <InputFile
                textLabel='Dirección de archivo'
                nameFile='file'
              />
            </fieldset>
          </section>
          <section className='flex justify-center'>
            <ButtonLight
              textButton='Enviar'
              typeButton='submit'
            />
          </section>
        </form>
        <form onSubmit={submitIssue} className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] two' style={{ left: attribute === 'two' ? '0' : '-600px' }}>
          <h2 className='text-2xl text-center mb-3 text-white'>Temas que toca el informe</h2>
          <fieldset className='flex flex-col border border-cyan-900 p-3 gap-4'>
            <Input
              textLabel='Tema:'
              nameInput='issue'
              typeInput='text'
            />
            <Input
              textLabel='Intensidad:'
              nameInput='intensity'
              typeInput='text'
            />
            <div className='flex justify-center'>
              <ButtonLight
                textButton='Agregar'
                typeButton='submit'
              />
            </div>
          </fieldset>
        </form>
        <form onSubmit={submiteIndividual} className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] three' style={{ left: attribute === 'three' ? '0' : '-600px' }}>
          <h2 className='text-2xl text-center mb-3 text-white'>Actores en el informe</h2>
          <fieldset className='flex flex-col border border-cyan-900 p-3 gap-4'>
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
            <div className='flex justify-center'>
              <ButtonLight
                textButton='Agregar'
                typeButton='submit'
              />
            </div>
          </fieldset>
        </form>
        <form onSubmit={submiteCollective} className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] four' style={{ left: attribute === 'four' ? '0' : '-600px' }}>
          <h2 className='text-2xl text-center mb-3 text-white'>Colectivos en el informe</h2>
          <fieldset className='flex flex-col border border-cyan-900 p-3 gap-4'>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Actor
              <select name='collective' className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]'>
                <option>Seleccionar</option>
                {
                  collectives.map(individual => (
                    <option key={individual.id_collective} value={individual.id_collective}>{individual.name_collective}</option>
                  ))
                }
              </select>
            </label>
            <div className='flex justify-center'>
              <ButtonLight
                textButton='Agregar'
                typeButton='submit'
              />
            </div>
          </fieldset>
        </form>
      </section>
      <p className={`${ngoweekly.id_ngo_weekly ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'one' ? { display: 'none' } : { display: 'block' }}>
        {
          ngoweekly.id_ngo_weekly ? 'El informe ha sido creado exitosamente, diríjase al PASO 2' : 'El informe aún no ha sido creado'
        }
      </p>
      <p className={`${issues !== '' ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'two' ? { display: 'none' } : { display: 'block' }}>
        {
          issues !== '' ? 'Puede seguir agregando temas o continuar con el PASO 3' : 'Agregue temas al informe'
        }
      </p>
      <p className={`${individualNgoWeekly !== '' ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'three' ? { display: 'none' } : { display: 'block' }}>
        {
          individualNgoWeekly !== '' ? 'Puede seguir agregando actores o continuar con el PASO 4' : 'Agregue actores al informe'
        }
      </p>
      <p className={`${collectiveNgoWeekly !== '' ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'four' ? { display: 'none' } : { display: 'block' }}>
        {
          collectiveNgoWeekly !== '' ? 'Puede seguir agregando colectivos o finalizar' : 'Agregue colectivos al informe'
        }
      </p>
    </main>
  )
}

export default Weekly

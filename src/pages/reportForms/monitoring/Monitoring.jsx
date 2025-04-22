/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import Input from '../../../components/atoms/Input'
import InputFile from '../../../components/atoms/InputFile'
import { useState, useEffect } from 'react'
import { URL } from '../../../helpers/config'
import ButtonLight from '../../../components/atoms/ButtonLight'

const Monitoring = () => {
  const [attribute, setAttribute] = useState('one')
  const [monitoring, setMonitoring] = useState({})
  const [issues, setIssues] = useState('')
  const [individuals, setIndividuals] = useState([])
  const [collectives, setCollectives] = useState([])
  const [individualMonitoring, setIndividualMonitoring] = useState('')
  const [collectiveMonitoring, setCollectiveMonitoring] = useState('')

  const fetchMonitoringData = () => {
    fetch(`${URL}/intermediate/individualMonitoring`)
      .then(res => res.json())
      .then(data => {
        setIndividualMonitoring(data)
      })
      .catch(error => console.error('Error:', error))

    fetch(`${URL}/intermediate/collectiveMonitoring`)
      .then(res => res.json())
      .then(data => {
        setCollectiveMonitoring(data)
      })
      .catch(error => console.error('Error:', error))
  }

  useEffect(() => {
    fetch(`${URL}/collectives`)
      .then(res => res.json())
      .then(data => {
        setCollectives(data)
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

  const submitForm = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('typeMonitoring', e.target.type.value)
    formData.append('priorityMonitoring', e.target.priority.value)
    formData.append('confidentialityMonitoring', e.target.confidentiality.value)
    formData.append('numMonitoring', e.target.num.value)
    formData.append('dateMonitoring', e.target.date.value)
    formData.append('file', e.target.file.files[0])
    formData.append('idUser', idUser)

    fetch(`${URL}/monitoring`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data[0].create_monitoring)
        setMonitoring(data[0].create_monitoring)
        setAttribute('block')
      })
      .catch(error => error)
  }

  const submitIssue = (e) => {
    e.preventDefault()
    const body = {
      issueReport: e.target.issue.value,
      intensityIssue: e.target.intensity.value,
      idReport: monitoring.id_monitoring
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
      idReport: monitoring.id_monitoring
    }

    fetch(`${URL}/intermediate/individualMonitoring`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(() => fetchMonitoringData())
      .then(data => {
        setIndividualMonitoring(data[0].insert_individuals_monitoring.message)
      })
  }

  const submiteCollective = (e) => {
    e.preventDefault()
    const body = {
      idSubject: e.target.collective.value,
      idReport: monitoring.id_monitoring
    }

    fetch(`${URL}/intermediate/collectiveMonitoring`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(() => fetchMonitoringData())
      .then(data => {
        setCollectiveMonitoring(data[0].insert_collectives_monitoring.message)
      })
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
        <form className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] one' onSubmit={submitForm} encType='multipart/form-data' style={{ left: attribute === 'one' ? '0' : '-600px' }}>
          <h1 className='text-2xl text-center mb-3 text-white'>Monitoreo</h1>
          <section className='flex gap-4 mb-4'>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <Input
                textLabel='Tipo de informe'
                nameInput='type'
                typeInput='text'
              />
              <Input
                textLabel='Prioridad'
                nameInput='priority'
                typeInput='text'
              />
              <Input
                textLabel='Confidencialidad'
                nameInput='confidentiality'
                typeInput='text'
              />
              <Input
                textLabel='Número de informe'
                nameInput='num'
                typeInput='text'
              />
              <Input
                textLabel='Fecha del informe'
                nameInput='date'
                typeInput='date'
                placeholder='Ej: 1990-08-12'
              />
              <InputFile
                textLabel='Dirección de archivo'
                nameFile='file'
              />
            </fieldset>
          </section>
          <section className='flex justify-center'>
            <ButtonLight
              textButton='CREAR'
              typeButton='submit'
            />
          </section>
        </form>
        <form className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] one' onSubmit={submitIssue} encType='multipart/form-data' style={{ left: attribute === 'two' ? '0' : '-600px' }}>
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
        <form className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] one' onSubmit={submiteIndividual} encType='multipart/form-data' style={{ left: attribute === 'three' ? '0' : '-600px' }}>
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
        <form className='absolute flex flex-col items-center justify-center w-[600px] h-[430px] one' onSubmit={submiteCollective} encType='multipart/form-data' style={{ left: attribute === 'four' ? '0' : '-600px' }}>
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
      <p className={`${monitoring.id_monitoring ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'one' ? { display: 'none' } : { display: 'block' }}>
        {
          monitoring.id_monitoring ? 'El informe ha sido creado exitosamente, diríjase al PASO 2' : 'El informe aún no ha sido creado'
        }
      </p>
      <p className={`${issues !== '' ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'two' ? { display: 'none' } : { display: 'block' }}>
        {
          issues !== '' ? 'Puede seguir agregando temas o continuar con el PASO 3' : 'Agregue temas al informe'
        }
      </p>
      <p className={`${individualMonitoring !== '' ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'three' ? { display: 'none' } : { display: 'block' }}>
        {
          individualMonitoring !== '' ? 'Puede seguir agregando actores o continuar con el PASO 4' : 'Agregue actores al informe'
        }
      </p>
      <p className={`${collectiveMonitoring !== '' ? 'text-green-500' : 'text-red-500'} text-center pt-2`} style={attribute !== 'four' ? { display: 'none' } : { display: 'block' }}>
        {
          collectiveMonitoring !== '' ? 'Puede seguir agregando colectivos o finalizar' : 'Agregue colectivos al informe'
        }
      </p>
    </main>
  )
}

export default Monitoring

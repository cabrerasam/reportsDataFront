/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { Link } from 'react-router-dom'
import DataSubject from '../../../components/molecules/DataSubject'
import Input from '../../../components/atoms/Input'
import ButtonDark from '../../../components/atoms/ButtonDark'
import InputFile from '../../../components/atoms/InputFile'
import { useState, useEffect } from 'react'
import { URL } from '../../../helpers/config'

const Speachs = () => {
  const [attribute, setAttribute] = useState('none')
  const [speach, setSpeach] = useState({})
  const [idUser, setIdUser] = useState('')
  const [individuals, setIndividuals] = useState([])

  useEffect(() => {
    fetch(`${URL}/login/authorized`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setIdUser(data.user.idUser))
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

  const submitForm = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('titleSpeach', e.target.title.value)
    formData.append('media', e.target.media.files[0])
    formData.append('dateSpeach', e.target.date.value)
    formData.append('idIndividual', individuals.filter(individual => individual.name_individual === e.target.individual.value)[0].id_individual)
    formData.append('idUser', idUser)

    fetch(`${URL}/speachs`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setSpeach(data)
        setAttribute('block')
      })
      .catch(error => error)
  }

  const { title_speach, speach: linkSpeach } = speach

  const handleClick = () => {
    window.onload()
  }

  return (
    <main className='w-full h-full flex justify-center items-center pt-40'>
      <section className='bg-custom-transparent backdrop-blur-xl absolute w-2/5 rounded-3xl px-8 py-5 flex flex-col' style={{ display: attribute }}>
        <section className='text-white font-light'>
          <h3 className='text-center font-bold text-cyan-500 text-2xl mb-2'>Datos del discurso</h3>
          <DataSubject spanText='título del discurso' pText={title_speach} />
          <DataSubject spanText='título del discurso' pText={linkSpeach} />
        </section>
        <section className='w-3/4 mt-5 m-auto flex justify-around'>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' onClick={handleClick}>Crear nuevo</Link>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' to='/'>Regresar</Link>
        </section>
      </section>
      <form onSubmit={submitForm} className='bg-cyan-800 p-3'>
        <h1 className='text-2xl text-center mb-3 text-white'>Discurso</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <Input
              textLabel='Título del discruso'
              nameInput='title'
              typeInput='text'
            />
            <Input
              textLabel='Fecha del discruso'
              nameInput='date'
              typeInput='text'
            />
            <InputFile
              textLabel='Dirección de archivo'
              nameFile='media'
            />
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Actor
              <select className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]' name='individual'>
                <option value=''>Selecciona actor</option>
                {
                  individuals.map(individual => (
                    <option key={individual.id_individual} value={individual.name_individual}>{individual.name_individual}</option>
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
      </form>
    </main>
  )
}

export default Speachs

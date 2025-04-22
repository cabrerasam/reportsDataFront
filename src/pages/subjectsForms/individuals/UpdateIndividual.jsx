/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { Link, useParams } from 'react-router-dom'
import Input from '../../../components/atoms/Input'
import DataSubject from '../../../components/molecules/DataSubject'
import ButtonDark from '../../../components/atoms/ButtonDark'
import { dateConvert } from '../../../helpers/dateConvert'
import { useState, useEffect } from 'react'
import { URL } from '../../../helpers/config'

const UpdateIndividual = () => {
  const { id } = useParams()
  const [individual, setIndividual] = useState({})
  const [networks, setNetworks] = useState({})
  const [attribute, setAttribute] = useState('none')

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
    fetch(`${URL}/individuals/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data[0])
        setIndividual(data[0])
      })
      .catch(error => console.error('Error:', error))
  }, [id])

  const submitForm = (e) => {
    e.preventDefault()

    const redes = {
      facebook: e.target.facebook.value ? e.target.facebook.value : 'No tiene',
      x: e.target.x.value ? e.target.x.value : 'No tiene',
      instagram: e.target.instagram.value ? e.target.instagram.value : 'No tiene',
      youtube: e.target.youtube.value ? e.target.youtube.value : 'No tiene',
      tiktok: e.target.tiktok.value ? e.target.tiktok.value : 'No tiene'
    }

    const body = {
      nameIndividual: e.target.name.value,
      nationalityIndividual: e.target.nationality.value,
      birthDateIndividual: e.target.birthdate.value,
      placeBirthIndividual: e.target.birthplace.value,
      genderIndividual: e.target.genre.value,
      maritalIndividual: e.target.marital.value,
      photoIndividual: individual.photo_individual,
      partyIndividual: e.target.party.value,
      workIndividual: e.target.work.value,
      educationIndividual: e.target.education.value,
      emailIndividual: e.target.email.value,
      phoneIndividual: e.target.phone.value,
      networksIndividual: JSON.stringify(redes),
      idUser
    }

    console.log(body)

    fetch(`${URL}/individuals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setIndividual(data[0])
        setNetworks(data[0].networks_individual)
        setAttribute('block')
      })
  }

  const handleClick = () => {
    window.onload()
  }

  const {
    name_individual,
    nationality_individual,
    birthdate_individual,
    place_birth_individual,
    gender_individual,
    marital_status_individual,
    photo_individual,
    party_individual,
    work_individual,
    education_individual,
    email_individual,
    phone_individual
  } = individual

  const {
    facebook,
    x,
    instagram,
    youtube,
    tiktok
  } = networks

  const dateCoverter = !birthdate_individual ? '' : dateConvert(birthdate_individual)

  return (
    <main className='w-screen h-full flex justify-center items-center pt-40'>
      <section className='bg-custom-transparent backdrop-blur-xl absolute w-2/5 rounded-3xl px-8 py-5 flex flex-col' style={{ display: attribute }}>
        <h2 className='text-center text-3xl mb-4 text-white'>{name_individual}</h2>
        <article className='grid grid-cols-2 gap-8'>
          <img className='rounded-3xl' src={`${URL}${photo_individual}`} alt={photo_individual} />
          <section className='text-white font-light'>
            <section className='mb-8'>
              <h3 className='text-center font-bold text-cyan-500 text-2xl mb-2'>Datos generales</h3>
              <DataSubject spanText='Nacionalidad' pText={nationality_individual} />
              <DataSubject spanText='Fecha de nacimiento' pText={dateCoverter} />
              <DataSubject spanText='Lugar de nacimiento' pText={place_birth_individual} />
              <DataSubject spanText='Género' pText={gender_individual} />
              <DataSubject spanText='Estado civil' pText={marital_status_individual} />
              <DataSubject spanText='Partido político' pText={party_individual} />
              <DataSubject spanText='Trabajo actual' pText={work_individual} />
              <DataSubject spanText='Grado de instrucción' pText={education_individual} />
              <DataSubject spanText='email' pText={email_individual} />
              <DataSubject spanText='Teléfono' pText={phone_individual} />
            </section>
            <section>
              <h3 className='text-center font-bold text-cyan-500 text-2xl mb-2'>Redes sociales</h3>
              <DataSubject spanText='Facebook' pText={facebook} />
              <DataSubject spanText='X' pText={x} />
              <DataSubject spanText='Instagram' pText={instagram} />
              <DataSubject spanText='Youtube' pText={youtube} />
              <DataSubject spanText='Tiktok' pText={tiktok} />
            </section>
          </section>
        </article>
        <section className='w-3/4 mt-5 m-auto flex justify-around'>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' onClick={handleClick}>Crear nuevo</Link>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' to='/'>Regresar</Link>
        </section>
      </section>
      <form onSubmit={submitForm} className='bg-cyan-800 p-3'>
        <h1 className='text-2xl text-center mb-3 text-white'>Actualizar persona</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <h2 className='text-xl text-white text-center '>Datos personales</h2>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span className=''>Nombre</span>
              <input
                type='text' name='name' defaultValue={individual.name_individual}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span className=''>Nacionalidad</span>
              <input
                type='text' name='nationality' defaultValue={individual.nationality_individual}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <Input
              textLabel='Fecha de nacimiento'
              nameInput='birthdate'
              typeInput='date'
            />
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span className=''>Lugar de nacimiento</span>
              <input
                type='text' name='birthplace' defaultValue={individual.place_birth_individual}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Género
              <select className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]' name='genre'>
                <option>Seleccionar</option>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              Estado civil
              <select className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-[305px]' name='marital'>
                <option>Seleccionar</option>
                <option>Soltero(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viudo(a)</option>
              </select>
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span className=''>Nro de teléfono</span>
              <input
                type='text' name='phone' defaultValue={individual.phone_individual}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span className=''>email</span>
              <input
                type='text' name='email' defaultValue={individual.email_individual}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span className=''>Nivel de educación</span>
              <input
                type='text' name='education' defaultValue={individual.education_individual}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
          </fieldset>
          <section className='flex flex-col justify-between'>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Datos organizacionales</h2>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>Partido político</span>
                <input
                  type='text' name='party' defaultValue={individual.party_individual}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>Trabajo</span>
                <input
                  type='text' name='work' defaultValue={individual.work_individual}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
            </fieldset>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Redes Sociales</h2>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>Facebook</span>
                <input
                  type='text' name='facebook' defaultValue={individual.networks_individual?.facebook || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>X</span>
                <input
                  type='text' name='x' defaultValue={individual.networks_individual?.x || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>Instagram</span>
                <input
                  type='text' name='instagram' defaultValue={individual.networks_individual?.instagram || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>Youtube</span>
                <input
                  type='text' name='youtube' defaultValue={individual.networks_individual?.youtube || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span className=''>Tiktok</span>
                <input
                  type='text' name='tiktok' defaultValue={individual.networks_individual?.tiktok || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
            </fieldset>
          </section>
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

export default UpdateIndividual

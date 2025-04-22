/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { useState, useEffect } from 'react'
import ButtonDark from '../../../components/atoms/ButtonDark'
import Input from '../../../components/atoms/Input'
import InputFile from '../../../components/atoms/InputFile'
import { Link } from 'react-router-dom'
import DataSubject from '../../../components/molecules/DataSubject'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const CreateIndividual = () => {
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
        console.log(data.user.idUser)
        setIdUser(data.user.idUser)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  const submitForm = (e) => {
    e.preventDefault()

    const redes = {
      facebook: e.target.facebook.value ? e.target.facebook.value : 'No tiene',
      x: e.target.x.value ? e.target.x.value : 'No tiene',
      instagram: e.target.instagram.value ? e.target.instagram.value : 'No tiene',
      youtube: e.target.youtube.value ? e.target.youtube.value : 'No tiene',
      tiktok: e.target.tiktok.value ? e.target.tiktok.value : 'No tiene'
    }

    const formData = new FormData()

    formData.append('nameIndividual', e.target.name.value)
    formData.append('nationalityIndividual', e.target.nationality.value)
    formData.append('birthDateIndividual', e.target.birthdate.value)
    formData.append('placeBirthIndividual', e.target.birthplace.value)
    formData.append('genderIndividual', e.target.genre.value)
    formData.append('maritalIndividual', e.target.marital.value)
    formData.append('photo', e.target.photo.files[0])
    formData.append('partyIndividual', e.target.party.value)
    formData.append('workIndividual', e.target.work.value)
    formData.append('educationIndividual', e.target.education.value)
    formData.append('emailIndividual', e.target.email.value)
    formData.append('phoneIndividual', e.target.phone.value)
    formData.append('networksIndividual', JSON.stringify(redes))
    formData.append('idUser', idUser)

    fetch(`${URL}/individuals`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setIndividual(data[0])
        setNetworks(data[0].networks_individual)
        setAttribute('block')
      })
      .catch(error => error)
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
      <form onSubmit={submitForm} className='bg-cyan-800 p-3' encType='multipart/form-data'>
        <h1 className='text-2xl text-center mb-3 text-white'>Crear persona</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <h2 className='text-xl text-white text-center '>Datos personales</h2>
            <Input
              textLabel='Nombre'
              nameInput='name'
              typeInput='text'
            />
            <Input
              textLabel='Nacionalidad'
              nameInput='nationality'
              typeInput='text'
            />
            <Input
              textLabel='Fecha de nacimiento'
              nameInput='birthdate'
              typeInput='date'
            />
            <Input
              textLabel='Lugar de nacimiento'
              nameInput='birthplace'
              typeInput='text'
              placeholder='Ciudad'
            />
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
            <Input
              textLabel='Nro de teléfono'
              nameInput='phone'
              typeInput='text'
            />
            <Input
              textLabel='email'
              nameInput='email'
              typeInput='email'
            />
            <Input
              textLabel='Nivel de educación'
              nameInput='education'
              typeInput='text'
            />
            <InputFile
              textLabel='Fotografía'
              nameFile='photo'
            />
          </fieldset>
          <section className='flex flex-col justify-between'>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Datos organizacionales</h2>
              <Input
                textLabel='Partido político'
                nameInput='party'
                typeInput='text'
              />
              <Input
                textLabel='Trabajo'
                nameInput='work'
                typeInput='text'
              />
            </fieldset>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Redes Sociales</h2>
              <Input
                textLabel='Facebook'
                nameInput='facebook'
                typeInput='text'
              />
              <Input
                textLabel='X'
                nameInput='x'
                typeInput='text'
              />
              <Input
                textLabel='Instagram'
                nameInput='instagram'
                typeInput='text'
              />
              <Input
                textLabel='Youtube'
                nameInput='youtube'
                typeInput='text'
              />
              <Input
                textLabel='TikTok'
                nameInput='tiktok'
                typeInput='text'
              />
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

export default CreateIndividual

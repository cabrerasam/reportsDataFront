/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { useState, useEffect } from 'react'
import Input from '../../../components/atoms/Input'
import ButtonDark from '../../../components/atoms/ButtonDark'
import DataSubject from '../../../components/molecules/DataSubject'
import { Link } from 'react-router-dom'
import InputText from '../../../components/atoms/InputText'
import { URL } from '../../../helpers/config'

const CreateCollective = () => {
  const [collective, setCollective] = useState({})
  const [networks, setNetworks] = useState({})
  const [personalList, setPersonalList] = useState([])
  const [currentRole, setCurrentRole] = useState('')
  const [currentPerson, setCurrentPerson] = useState('')
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

  const addPersonal = () => {
    console.log('currentRole:', currentRole, 'currentPerson:', currentPerson)
    if (currentRole.trim() && currentPerson.trim()) {
      setPersonalList(prevList => [
        ...prevList,
        { role: currentRole, person: currentPerson }
      ])
      setCurrentRole('')
      setCurrentPerson('')
    } else {
      console.log('Llena todos los campos')
    }
  }

  const submitForm = (e) => {
    e.preventDefault()
    const redes = {
      facebook: e.target.facebook.value ? e.target.facebook.value : 'No tiene',
      x: e.target.x.value ? e.target.x.value : 'No tiene',
      instagram: e.target.instagram.value ? e.target.instagram.value : 'No tiene',
      youtube: e.target.youtube.value ? e.target.youtube.value : 'No tiene',
      tiktok: e.target.tiktok.value ? e.target.tiktok.value : 'No tiene'
    }

    const personal = personalList.reduce((acc, item) => {
      acc[item.role] = item.person
      return acc
    }, {})

    const body = {
      nameCollective: e.target.name.value,
      originCollective: e.target.origin.value,
      typeCollective: e.target.type.value,
      headquartersCollective: e.target.headquarters.value,
      descriptionCollective: e.target.description.value,
      missionCollective: e.target.mission.value,
      visionCollective: e.target.vision.value,
      networkCollective: redes,
      infAreaCollective: e.target.area.value,
      financingCollective: e.target.financing.value,
      personalCollective: personal,
      idUser
    }

    fetch(`${URL}/collectives`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setCollective(data[0])
        setNetworks(data[0].network_collective)
        setAttribute('block')
      })
      .catch(error => error)
  }

  const handleClick = () => {
    window.onload()
  }

  const {
    name_collective,
    origin_collective,
    type_collective,
    headquarters_collective,
    description_collective,
    mission_collective,
    vision_collective,
    inf_area_collective,
    financing_collective
  } = collective

  const {
    facebook,
    x,
    instagram,
    youtube
  } = networks

  return (
    <main className='w-screen h-full flex justify-center items-center pt-40'>
      <section className='bg-custom-transparent backdrop-blur-xl absolute w-2/5 rounded-3xl px-8 py-5 flex flex-col' style={{ display: attribute }}>
        <h2 className='text-center text-3xl mb-4 text-white'>{name_collective}</h2>
        <article className='grid grid-cols-2 gap-8'>
          <section className='text-white font-light'>
            <h3 className='text-center text-2xl mb-2 text-cyan-500 font-bold'>Datos generales</h3>
            <DataSubject spanText='Nacionalidad' pText={origin_collective} />
            <DataSubject spanText='Tipo de colectivo' pText={type_collective} />
            <DataSubject spanText='Sede' pText={headquarters_collective} />
            <DataSubject spanText='Descripción' pText={description_collective} />
            <DataSubject spanText='Misión' pText={mission_collective} />
            <DataSubject spanText='Visión' pText={vision_collective} />
            <DataSubject spanText='Área de influencia' pText={inf_area_collective} />
            <DataSubject spanText='Financiamiento' pText={financing_collective} />
          </section>
          <section>
            <section className='text-white font-light mb-8'>
              <h3 className='text-center text-2xl mb-2 text-cyan-500 font-bold'>Redes Sociales</h3>
              <DataSubject spanText='Facebook' pText={facebook} />
              <DataSubject spanText='X' pText={x} />
              <DataSubject spanText='Instagram' pText={instagram} />
              <DataSubject spanText='Youtube' pText={youtube} />
            </section>
            <section className='text-white font-light'>
              <h3 className='text-center text-2xl mb-2 text-cyan-500 font-bold'>Organización</h3>
              <ul>
                {personalList.map((item, index) => (
                  <li key={index} className='flex justify-around border-b border-cyan-700 py-1'>
                    <span className='text-cyan-500'>{item.role}:</span>
                    <span>{item.person}</span>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </article>
        <section className='w-3/4 mt-5 m-auto flex justify-around'>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' onClick={handleClick}>Crear nuevo</Link>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' to='/'>Regresar</Link>
        </section>
      </section>
      <form onSubmit={submitForm} className='bg-cyan-800 p-3'>
        <h1 className='text-2xl text-center mb-3 text-white'>Crear colectivo</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <h2 className='text-xl text-white text-center '>Datos generales</h2>
            <Input
              textLabel='Nombre colectivo'
              nameInput='name'
              typeInput='text'
            />
            <Input
              textLabel='Origen del colectivo'
              nameInput='origin'
              typeInput='text'
            />
            <Input
              textLabel='Tipo de colectivo'
              nameInput='type'
              typeInput='text'
            />
            <Input
              textLabel='Cede del colectivo'
              nameInput='headquarters'
              typeInput='text'
              placeholder='Ciudad'
            />
            <InputText
              textLabel='Descripción del colectivo'
              nameText='description'
            />
            <InputText
              textLabel='Misión del colectivo'
              nameText='mission'
            />
            <InputText
              textLabel='Visión del colectivo'
              nameText='vision'
            />
            <Input
              textLabel='Área de influencia'
              nameInput='area'
              typeInput='text'
            />
            <Input
              textLabel='Financiamiento'
              nameInput='financing'
              typeInput='text'
            />
          </fieldset>
          <section className='flex flex-col justify-between'>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Datos organizacionales</h2>
              <div className='flex flex-col gap-4 mb-4'>
                <Input
                  textLabel='Nombre del cargo'
                  nameInput='role'
                  typeInput='text'
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                />
                <Input
                  textLabel='Nombre de la persona'
                  nameInput='person'
                  typeInput='text'
                  value={currentPerson}
                  onChange={(e) => setCurrentPerson(e.target.value)}
                />
                <button
                  type='button'
                  className='bg-lime-600 px-4 py-2 rounded-lg text-white w-[100px]'
                  onClick={addPersonal}
                >
                  Agregar
                </button>
              </div>
              <ul className='text-white font-light'>
                {personalList.map((item, index) => (
                  <li key={index} className='flex justify-around border-b border-cyan-700 py-1'>
                    <span className='text-cyan-500'>{item.role}:</span>
                    <span>{item.person}</span>
                  </li>
                ))}
              </ul>
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

export default CreateCollective

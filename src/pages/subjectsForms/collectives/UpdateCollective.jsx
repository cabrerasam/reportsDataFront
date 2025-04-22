/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataSubject from '../../../components/molecules/DataSubject'
import ButtonDark from '../../../components/atoms/ButtonDark'
import { URL } from '../../../helpers/config'

const UpdateCollective = () => {
  const { id } = useParams()
  const [collective, setCollective] = useState({})
  const [networks, setNetworks] = useState({})
  const [personal, setPersonal] = useState({})
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
    fetch(`${URL}/collectives/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data[0])
        setCollective(data[0])
        console.log(data[0].personal_collective)
        setPersonal(data[0].personal_collective)
      })
      .catch(error => console.error('Error:', error))
  }, [id])

  useEffect(() => {
    fetch(`${URL}/collectives/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data[0])
        setCollective(data[0])
      })
      .catch(error => console.error('Error:', error))
  }, [id])

  const addPersonal = () => {
    console.log('personal:', personal)
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log(collective)

    const redes = {
      facebook: e.target.facebook.value ? e.target.facebook.value : 'No tiene',
      x: e.target.x.value ? e.target.x.value : 'No tiene',
      instagram: e.target.instagram.value ? e.target.instagram.value : 'No tiene',
      youtube: e.target.youtube.value ? e.target.youtube.value : 'No tiene',
      tiktok: e.target.tiktok.value ? e.target.tiktok.value : 'No tiene'
    }

    const personal = 'Hola'

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

    fetch(`${URL}/collectives/${id}`, {
      method: 'PUT',
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
    youtube,
    tiktok
  } = networks

  return (
    <main className='w-screen h-full flex justify-center items-center pt-20'>
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
              <DataSubject spanText='Tiktok' pText={tiktok} />
            </section>
            <section className='text-white font-light'>
              <h3 className='text-center text-2xl mb-2 text-cyan-500 font-bold'>Organización</h3>
              <ul>
                {JSON.stringify(personal)}
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
        <h1 className='text-2xl text-center mb-3 text-white'>Actualizar colectivo</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <h2 className='text-xl text-white text-center '>Datos generales</h2>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Nombre del colectivo</span>
              <input
                type='text'
                name='name'
                defaultValue={collective.name_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Origen del colectivo</span>
              <input
                type='text'
                name='origin'
                defaultValue={collective.origin_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Tipo de colectivo</span>
              <input
                type='text'
                name='type'
                defaultValue={collective.type_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Cede del colectivo</span>
              <input
                type='text'
                name='headquarters'
                defaultValue={collective.headquarters_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                placeholder='Ciudad'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Descripción del colectivo</span>
              <textarea
                type='text'
                name='description'
                defaultValue={collective.description_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72 h-[100px]'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Misión del colectivo</span>
              <textarea
                type='text'
                name='mission'
                defaultValue={collective.mission_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72 h-[100px]'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Visión del colectivo</span>
              <textarea
                type='text'
                name='vision'
                defaultValue={collective.vision_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72 h-[100px]'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Área de influencia</span>
              <input
                type='text'
                name='area'
                defaultValue={collective.inf_area_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
            <label className='text-white mt-2 flex items-center justify-between gap-4'>
              <span>Financiamiento</span>
              <input
                type='text'
                name='financing'
                defaultValue={collective.financing_collective}
                className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
              />
            </label>
          </fieldset>
          <section className='flex flex-col justify-between'>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Datos organizacionales</h2>
              <div className='flex flex-col gap-4 mb-4'>
                <ul>
                  {JSON.stringify(personal)}
                </ul>
                <button
                  type='button'
                  className='bg-lime-600 px-4 py-2 rounded-lg text-white w-[100px]'
                  onClick={addPersonal}
                >
                  Agregar
                </button>
              </div>
              <ul className='text-white font-light'>
                {JSON.stringify(personal)}
              </ul>
            </fieldset>
            <fieldset className='flex flex-col border border-cyan-900 p-3'>
              <h2 className='text-xl text-white text-center '>Redes Sociales</h2>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span>Facebook</span>
                <input
                  type='text'
                  name='facebook'
                  defaultValue={collective.network_collective?.facebook || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span>X</span>
                <input
                  type='text'
                  name='x'
                  defaultValue={collective.network_collective?.x || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span>Instagram</span>
                <input
                  type='text'
                  name='instagram'
                  defaultValue={collective.network_collective?.instagram || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span>Youtube</span>
                <input
                  type='text'
                  name='youtube'
                  defaultValue={collective.network_collective?.youtube || ''}
                  className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
                />
              </label>
              <label className='text-white mt-2 flex items-center justify-between gap-4'>
                <span>Tiktok</span>
                <input
                  type='text'
                  name='tiktok'
                  defaultValue={collective.network_collective?.tiktok || ''}
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

export default UpdateCollective

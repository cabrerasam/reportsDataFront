/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import LinkMenu from '../atoms/LinkMenu.jsx'
import SvgIndividual from '../atoms/SvgIndividual.jsx'
import SvgReport from '../atoms/SvgReport.jsx'
import SvgUser from '../atoms/SvgUser.jsx'
import bolivia from '../../assets/logo-bolivia-full.png'
import { useState, useEffect } from 'react'
import { URL } from '../../helpers/config.js'

const NavMenu = ({ name, idRole }) => {
  const [attribute, setAttribute] = useState('none')
  const [attributeOne, setAttributeOne] = useState('none')
  const [role, setRole] = useState('')

  useEffect(() => {
    fetch(`${URL}/roles/${idRole}`)
      .then(res => res.json())
      .then(data => {
        setRole(data[0].name_role)
      })
      .catch(error => console.error('Error:', error))
  }, [idRole])

  const changeSubject = () => {
    if (attribute === 'none') {
      setAttribute('block')
    } else {
      setAttribute('none')
    }
  }

  const changeReport = () => {
    if (attributeOne === 'none') {
      setAttributeOne('block')
    } else {
      setAttributeOne('none')
    }
  }

  const logOut = (e) => {
    e.preventDefault()
    fetch(`${URL}/login/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        window.location.href = '/login'
      })
      .catch(error => console.error('Error:', error))
  }

  return (
    <>
      <nav className='w-full h-[80px] grid grid-cols-3 items-center bg-cyan-950 gap-16 sticky top-0 py-4'>
        <div className='h-9 flex items-center justify-center'>
          <Link to='/' className='flex items-center gap-4'>
            <img className='w-16' src={bolivia} alt='Bolivia' />
            <p className='text-[25px] font-bold flex gap-2'>
              <span className='text-white'>U</span>
              <span className='text-white'>A</span>
              <span className='text-white'>I</span>
              <span className='text-white'>G</span>
            </p>
          </Link>
        </div>
        <ul className='flex gap-16 justify-center'>
          <li className='flex items-center'>
            <span className='mr-2'>
              <SvgUser />
            </span>
            <LinkMenu link='/user' textLink='Usuarios' />
          </li>
          <li className='flex items-center'>
            <span className='mr-2'>
              <SvgIndividual />
            </span>
            <p className='text-white text-base flex flex-col relative cursor-pointer' onClick={changeSubject}>Sujetos</p>
          </li>
          <li className='flex items-center'>
            <span className='mr-2'>
              <SvgReport />
            </span>
            <p className='text-white text-base flex flex-col relative cursor-pointer' onClick={changeReport}>Informes</p>
          </li>
        </ul>
        <div className='flex items-center gap-6 justify-center'>
          <p className='text-white text-base'>Bienvenido: <span className='ml-2 text-cyan-400'>{name} - {role}</span></p>
          <button onClick={logOut}>
            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#eF4444'><path d='M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-156.5T197-763l56 56q-44 44-68.5 102T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-67-24.5-125T707-707l56-56q54 54 85.5 126.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-440h80v440h-80Z' /></svg>
          </button>
        </div>
      </nav>
      <section className='sticky w-full bg-cyan-700 top-[80px]' style={{ display: attribute }} onMouseLeave={() => setAttribute('none')}>
        <div className='w-3/5 mx-auto flex justify-around'>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Individual</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/individualList' textLink='Listar' />
              <LinkMenu link='/individual' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Discursos</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/speachList' textLink='Listar' />
              <LinkMenu link='/speach' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Asociaciones</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/associationList' textLink='Listar' />
              <LinkMenu link='/association' textLink='Crear' />
              <LinkMenu link='/association/join' textLink='Emparejar' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Colectivos</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/collectiveList' textLink='Listar' />
              <LinkMenu link='/collective' textLink='Crear' />
            </div>
          </section>
        </div>
      </section>
      <section className='w-full bg-cyan-700 top-[80px] sticky' style={{ display: attributeOne }} onMouseLeave={() => setAttributeOne('none')}>
        <div className='w-3/5 mx-auto flex justify-around'>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Diario</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/diaryList' textLink='Listar' />
              <LinkMenu link='/diary' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Monitoreo</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/monitoringList' textLink='Listar' />
              <LinkMenu link='/monitoring' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Alerta</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/alertList' textLink='Listar' />
              <LinkMenu link='/alert' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Semanal</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/weeklyList' textLink='Listar' />
              <LinkMenu link='/weekly' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>ONG semanal</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/ngoweeklyList' textLink='Listar' />
              <LinkMenu link='/ngoweekly' textLink='Crear' />
            </div>
          </section>
          <section className='text-center text-base text-white h-full px-8 py-4 border-x border-cyan-800'>
            <h3 className='text-cyan-400 mb-3 underline'>Dominical</h3>
            <div className='flex gap-8 items-center justify-center'>
              <LinkMenu link='/sundaysList' textLink='Listar' />
              <LinkMenu link='/sunday' textLink='Crear' />
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default NavMenu

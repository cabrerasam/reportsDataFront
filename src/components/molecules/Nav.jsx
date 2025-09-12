/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { UseData } from '../../hooks/UseData'
import { URL } from '../../helpers/config'
const Nav = ({ role, name }) => {
  const [data, setData] = useState(null)
  const [state, setState] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await UseData({ endpoint: `roles/${role}` })
      setData(result)
    }
    fetchData()
  }, [role])

  const roleName = data ? data[0]?.name_role : 'Cargando...'

  const logout = () => {
    fetch(`${URL}/login/logout`, {
      method: 'POST',
      credentials: 'include'
    })

    window.location.reload()
  }

  const changeState = () => {
    setState(!state)
  }

  return (
    <nav className='w-full h-[60px] bg-cyan-950 flex justify-center items-center flex-col'>
      <ul className='w-3/4 grid grid-cols-3'>
        <li className='text-white text-lg p-4 relative'>
          <p className='hover:cursor-pointer hover:text-custom-red' onClick={changeState}>Informes</p>
          <ul className='bg-cyan-950 absolute mt-5 flex gap-3 px-4 py-2 border-t border-cyan-700' style={{ display: state ? 'flex' : 'none' }}>
            <li className='hover:cursor-pointer hover:text-custom-red' onClick={changeState}><a href='/createReport'>Generar Informe</a></li>
            <li className='w-[1px] h-[30px] bg-cyan-700' />
            <li className='hover:cursor-pointer hover:text-custom-red' onClick={changeState}>Historial de Informes</li>
          </ul>
        </li>
        <li className='flex justify-center items-center'>
          <h1 className='text-white text-2xl font-bold p-4'>UAIG</h1>
        </li>
        <li className='text-white font-thin text-lg p-4 flex items-center justify-end gap-4'>
          <p className='flex gap-2 items-center'>Bienvenido <span className='text-custom-red'>{roleName}</span> <span className='block w-[1px] h-[20px] bg-cyan-800' /> <span>{name}</span></p>
          <button type='button' onClick={logout} className='text-cyan-200 text-sm font-normal px-2 bg-cyan-900 rounded-md hover:bg-cyan-950'>cerrar sesión</button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

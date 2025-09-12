import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './App.css'
import stop from '../src/assets/stop.svg'
import { URL } from '../src/helpers/config'
import Nav from './components/molecules/Nav'

function App () {
  const [nick, setNick] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    fetch(`${URL}/login/authorized`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setNick(data.user.userNick)
        setRole(data.user.idRole)
        setName(data.user.userName)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  if (!nick) {
    return (
      <main className='w-screen h-screen flex flex-col justify-center items-center'>
        <article className='bg-custom-transparent w-auto h-[350px] flex justify-center items-center rounded-3xl text-custom-red font-bold text-[50px] gap-8 px-8 border border-custom-red'>
          <div className='w-[300px] h-[300px]'>
            <img src={stop} alt='Stop' />
          </div>
          <div>
            <p>ACCESO NO</p>
            <p>AUTORIZADO</p>
          </div>
        </article>
        <Link to='/login' className='bg-custom-red py-4 px-8 text-white text-2xl font-bold hover:bg-custom-red-dark mt-4 rounded-3xl'>Ingresar</Link>
      </main>
    )
  }

  return (
    <>
      <Nav name={name} role={role} />
      <Outlet />
    </>
  )
}

export default App

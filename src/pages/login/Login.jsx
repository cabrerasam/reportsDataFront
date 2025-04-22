import { useState, useEffect } from 'react'
import logo from '../../assets/logo-bolivia-full.png'
import { URL } from '../../helpers/config'

const Login = () => {
  const [user, setUser] = useState('')
  const submitForm = (e) => {
    e.preventDefault()
    const body = {
      userNick: e.target.nick.value,
      userPassword: e.target.password.value
    }

    fetch(`${URL}/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user[0].validate_user.user_name)
      })
      .catch(error => console.error('Error:', error))
  }

  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        window.location.href = '/'
      }, 5000)
      return () => clearTimeout(timeoutId)
    }
  }, [user])

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center relative'>
      <section aria-live='polite' className={user !== '' ? 'login-animate' : 'hidden'}>
        <p className='text-white text-xl'>Bienvenid@</p>
        <p className='text-red-500'>{user}</p>
        <p className='text-white'>En un momento accederemos a nuestra aplicación</p>
      </section>
      <section className='w-[600px] h-[600px] bg-custom-transparent rounded-2xl flex flex-col items-center justify-center relative overflow-hidden'>
        <img src={logo} alt='Login' className='w-[230px] h-[230px] object-cover mt-[-80px]' />
        <h1 className='mt-8 mb-8 font-bold text-4xl text-white'>Login</h1>
        <form className='flex flex-col gap-6' onSubmit={submitForm}>
          <label className='flex gap-2'>
            <h2 className='py-2 bg-cyan-700 w-[90px] text-center text-white rounded-lg'>Usuario</h2>
            <input type='text' name='nick' placeholder='Usuario' className='bg-white px-4 rounded-lg' required />
          </label>
          <label className='flex gap-2'>
            <h2 className='py-2 bg-cyan-700 w-[90px] text-center text-white rounded-lg'>Contraseña</h2>
            <input type='password' name='password' placeholder='Contraseña' className='bg-white px-4 rounded-lg' required />
          </label>
          <button type='submit' className='w-full absolute bottom-0 left-0 bg-cyan-700 py-4 text-white text-center text-xl font-bold hover:bg-cyan-800'>Ingresar</button>
        </form>
      </section>
    </main>
  )
}

export default Login

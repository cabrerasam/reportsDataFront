import { useState, useEffect } from 'react'
import DataSubject from '../../../components/molecules/DataSubject'
import { Link } from 'react-router-dom'
import Input from '../../../components/atoms/Input'
import ButtonDark from '../../../components/atoms/ButtonDark'
import { URL } from '../../../helpers/config'

const Associations = () => {
  const [attribute, setAttribute] = useState('none')
  const [association, setAssociation] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    fetch(`${URL}/login/authorized`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUser(data.user.idUser))
      .catch(error => error)
  }, [])

  const submitForm = (e) => {
    e.preventDefault()

    const body = {
      association: e.target.name.value,
      idUser: user
    }

    fetch(`${URL}/associations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAssociation(data)
        setAttribute('block')
      })
      .catch(error => error)
  }

  const handleClick = () => {
    window.onload()
  }

  return (
    <main className='w-full h-full flex flex-col items-center justify-center pt-40'>
      <section className='bg-custom-transparent backdrop-blur-xl absolute w-2/5 rounded-3xl px-8 py-5 flex flex-col' style={{ display: attribute }}>
        <section className='text-white font-light'>
          <h3 className='text-center font-bold text-cyan-500 text-2xl mb-2'>Datos de la asociación</h3>
          <DataSubject spanText='Nombre de la asociación' pText={association.association} />
        </section>
        <section className='w-3/4 mt-5 m-auto flex justify-around'>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' onClick={handleClick}>Crear nuevo</Link>
          <Link className='bg-lime-600 px-2 w-32 hover:bg-lime-700 text-center py-1 rounded-lg text-slate-100' to='/'>Regresar</Link>
        </section>
      </section>
      <form onSubmit={submitForm} className='bg-cyan-800 p-3'>
        <h1 className='text-2xl text-center mb-3 text-white'>Asociación</h1>
        <section className='flex gap-4 mb-4'>
          <fieldset className='flex flex-col border border-cyan-900 p-3'>
            <Input
              textLabel='Asociación'
              nameInput='name'
              typeInput='text'
            />
          </fieldset>
        </section>
        <section className='flex justify-center'>
          <ButtonDark
            textButton='Enviar'
            typeButton='submit'
          />
        </section>
      </form>
      <a className='mt-8 px-4 py-2 bg-cyan-700 text-white' href='/association/join'>Siguiente</a>
    </main>
  )
}

export default Associations

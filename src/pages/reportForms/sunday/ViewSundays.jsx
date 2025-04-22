import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'

const ViewSundays = () => {
  const URL = import.meta.env.VITE_API_URL
  const [sundays, setSundays] = useState([])
  const [starDate, setStarDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [themefilter, setThemefilter] = useState('')

  useEffect(() => {
    fetch(`${URL}/sundays`)
      .then(res => res.json())
      .then(data => setSundays(data))
      .catch(error => error)
  }, [])

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Domingos</h1>
      <div className='col-span-2 text-center text-white border border-cyan-950'>Filtrar por
        <section className='col-span-2 grid grid-cols-2 gap-8 p-4'>
          <label className='text-cyan-500 flex flex-col'>
            Temática
            <input
              className='bg-white text-cyan-950'
              type='text'
              value={themefilter}
              onChange={
                (e) => setThemefilter(e.target.value)
              }
            />
          </label>
          <div className='grid grid-cols-2 gap-4'>
            <label className='text-cyan-500 flex flex-col'>
              Fecha inicio
              <input className='bg-white text-cyan-950' type='date' value={starDate} onChange={(e) => setStarDate(e.target.value)} />
            </label>
            <label className='text-cyan-500 flex flex-col'>
              Fecha final
              <input className='bg-white text-cyan-950' type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
          </div>
        </section>
      </div>
      <ul className='w-3/4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 '>
        {
          sundays
            .filter(report => {
              const reportDate = new Date(report.date_sunday)
              const start = starDate ? new Date(starDate) : null
              const end = endDate ? new Date(endDate) : null
              const matchesTheme = themefilter
                ? report.issue_sunday.toLowerCase().includes(themefilter.toLowerCase())
                : true

              return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
            })
            .map((sunday, index) => (
              <li key={index} className='text-white flex items-center place-self-center'>
                <div className='flex flex-col w-[420px] gap-1 bg-custom-transparent px-4 py-4 mt-8'>
                  <p><span className='text-cyan-500 font-bold'>Tipo de informe: </span>{sunday.type_sunday}</p>
                  <p><span className='text-cyan-500 font-bold'>Nro de informe: </span>{sunday.num_sunday}</p>
                  <p><span className='text-cyan-500 font-bold'>Fecha del informe: </span>{dateConvert(sunday.date_sunday)}</p>
                  <p><span className='text-cyan-500 font-bold'>Temas del informe: </span>{sunday.issue_sunday}</p>
                  <Link to={`/sundaysList/${sunday.id_sunday}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Abrir</Link>
                </div>
              </li>
            ))
        }
      </ul>
    </main>
  )
}

export default ViewSundays

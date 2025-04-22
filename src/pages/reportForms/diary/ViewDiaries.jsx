import { useState, useEffect } from 'react'
import { dateConvert } from '../../../helpers/dateConvert'
import { Link } from 'react-router-dom'
import { URL } from '../../../helpers/config'

const ViewDiaries = () => {
  const [diaries, setDiaries] = useState([])
  const [starDate, setStarDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [themefilter, setThemefilter] = useState('')
  const [credentials, setCredentials] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    fetch(`${URL}/login/authorized`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setCredentials(data.user)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  useEffect(() => {
    fetch(`${URL}/roles`)
      .then(res => res.json())
      .then(data => {
        setRoles(data)
      })
      .catch(error => console.error('Error fetching roles:', error))
  }, [])

  useEffect(() => {
    fetch(`${URL}/diaries`)
      .then(res => res.json())
      .then(data => setDiaries(data))
      .catch(error => error)
  }, [])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = diaries.filter(
            (diary) => diary.id_user === credentials.idUser
          )
          setDiaries(filtered)
        } else {
          setDiaries(diaries)
        }
      }
    }
  }, [credentials, roles, diaries])

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Informes diarios</h1>
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
          diaries
            .filter(report => {
              const reportDate = new Date(report.date_diary)
              const start = starDate ? new Date(starDate) : null
              const end = endDate ? new Date(endDate) : null
              const matchesTheme = themefilter
                ? report.issue_diary.toLowerCase().includes(themefilter.toLowerCase())
                : true

              return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
            })
            .map((diary, index) => (
              <li key={index} className='text-white flex items-center place-self-center'>
                <div className='flex flex-col w-[420px] gap-1 bg-custom-transparent px-4 py-4 mt-8'>
                  <p><span className='text-cyan-500 font-bold'>Tip ode informe: </span>{diary.type_diary}</p>
                  <p><span className='text-cyan-500 font-bold'>Nro de informe: </span>{diary.num_diary}</p>
                  <p><span className='text-cyan-500 font-bold'>Fecha del informe: </span>{dateConvert(diary.date_diary)}</p>
                  <p><span className='text-cyan-500 font-bold'>Temas del informe: </span>{diary.issue_diary}</p>
                  <Link to={`/diaryList/${diary.id_diary}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Abrir</Link>
                </div>
              </li>
            ))
        }
      </ul>
    </main>
  )
}

export default ViewDiaries

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const ViewNgoWeekly = () => {
  const [ngoWeekly, setNgoWeekly] = useState([])
  const [issues, setIssues] = useState([])

  const [starDate, setStarDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [themefilter, setThemefilter] = useState('')

  useEffect(() => {
    fetch(`${URL}/ngoweekly`)
      .then(res => res.json())
      .then(data => setNgoWeekly(data))
      .catch(error => error)
  }, [])

  useEffect(() => {
    fetch(`${URL}/issues`)
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(error => error)
  }, [])

  return (
    <main className='flex justify-center items-center flex-col pb-8'>
      <h1 className='text-4xl text-white my-8'>Informes semanales de ONG</h1>
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
      <ul className='w-3/4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-2 mt-8'>
        {
          ngoWeekly
            .filter(report => {
              const reportDate = new Date(report.date_ngo_weekly)
              const start = starDate ? new Date(starDate) : null
              const end = endDate ? new Date(endDate) : null
              const reportIssues = issues.filter(issue => issue.id_report === report.id_ngo_weekly)
              const matchesTheme = themefilter
                ? reportIssues.some(issue => issue.issue_report.toLowerCase().includes(themefilter.toLowerCase()))
                : true

              return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
            })
            .map((ngoWeekly, index) => (
              <li key={index} className='text-white flex items-center place-self-center'>
                <div className='flex flex-col w-[420px] h-[180px] gap-1 bg-custom-transparent px-4 py-4'>
                  <p><span className='text-cyan-500 font-bold'>Nro de informe: </span>{ngoWeekly.num_ngo_weekly}</p>
                  <p><span className='text-cyan-500 font-bold'>Fecha del informe: </span>{dateConvert(ngoWeekly.date_ngo_weekly)}</p>
                  <p><span className='text-cyan-500 font-bold'>Temas: </span></p>
                  <ul>
                    {
                      issues
                        .filter(issue => issue.id_report === ngoWeekly.id_ngo_weekly)
                        .map((issue, index) => (
                          <li key={index}><span className='text-cyan-500 mr-2'>{index + 1}: </span>{issue.issue_report}</li>
                        ))
                    }
                  </ul>
                  <Link to={`/ngoweeklyList/${ngoWeekly.id_ngo_weekly}`} className='text-center bg-cyan-500 w-28 px-4 mt-2'>Abrir</Link>
                </div>
              </li>
            ))
        }
      </ul>
    </main>
  )
}

export default ViewNgoWeekly

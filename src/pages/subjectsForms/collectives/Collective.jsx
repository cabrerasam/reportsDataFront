/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const Collective = () => {
  const { id } = useParams()
  const [collective, setCollective] = useState({})
  const [networks, setNetworks] = useState({})
  const [personal, setPersonal] = useState({})
  const [subjectAssociation, setSubjectAssociation] = useState([])
  const [associations, setAssociations] = useState([])
  const [issues, setIssues] = useState('')
  const [credentials, setCredentials] = useState({})
  const [roles, setRoles] = useState([])

  // Filters
  const [starDate, setStarDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [themefilter, setThemefilter] = useState('')

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

  // collective diaries
  const [collectiveDiaries, setCollectiveDiaries] = useState([])
  const [diaries, setDiaries] = useState([])
  const [filteredDiaries, setFilteredDiaries] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveDiaries`)
      .then(res => res.json())
      .then(data => {
        setCollectiveDiaries(data.filter(report => report.id_collective === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/diaries`)
      .then(res => res.json())
      .then(data => {
        setDiaries(data.filter(report => collectiveDiaries.some(diary => diary.id_diary === report.id_diary)))
      })
  }, [collectiveDiaries])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      console.log(userRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = diaries.filter(
            (diary) => diary.id_user === credentials.idUser
          )
          setFilteredDiaries(filtered)
        } else {
          setFilteredDiaries(diaries)
        }
      }
    }
  }, [credentials, roles, diaries, id])

  //  collective Monitoring
  const [collectiveMonitoring, setCollectiveMonitoring] = useState([])
  const [monitoring, setMonitoring] = useState([])
  const [filteredMonitoring, setFilteredMonitoring] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveMonitoring`)
      .then(res => res.json())
      .then(data => {
        setCollectiveMonitoring(data.filter(report => report.id_collective === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/monitoring`)
      .then(res => res.json())
      .then(data => {
        setMonitoring(data.filter(report => collectiveMonitoring.some(monitoring => monitoring.id_monitoring === report.id_monitoring)))
      })
  }, [collectiveMonitoring])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      console.log(userRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = monitoring.filter(
            (monitoring) => monitoring.id_user === credentials.idUser
          )
          setFilteredMonitoring(filtered)
        } else {
          setFilteredMonitoring(monitoring)
        }
      }
    }
  }, [credentials, roles, monitoring, id])

  // collective Alert
  const [collectiveAlerts, setCollectiveAlerts] = useState([])
  const [alerts, setAlerts] = useState([])
  const [filteredAlerts, setFilteredAlerts] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveAlert`)
      .then(res => res.json())
      .then(data => {
        setCollectiveAlerts(data.filter(report => report.id_collective === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/alerts`)
      .then(res => res.json())
      .then(data => {
        setAlerts(data.filter(report => collectiveAlerts.some(alert => alert.id_alert === report.id_alert)))
      })
  }, [collectiveAlerts])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = alerts.filter(
            (alert) => alert.id_user === userRole.idUser
          )
          setFilteredAlerts(filtered)
        } else {
          setFilteredAlerts(alerts)
        }
      }
    }
  }, [credentials, roles, alerts, id])

  // collective Sunday
  const [collectiveSundays, setCollectiveSundays] = useState([])
  const [sundays, setSundays] = useState([])
  const [filteredSundays, setFilteredSundays] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveSunday`)
      .then(res => res.json())
      .then(data => {
        setCollectiveSundays(data.filter(report => report.id_collective === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/sundays`)
      .then(res => res.json())
      .then(data => {
        setSundays(data.filter(report => collectiveSundays.some(sunday => sunday.id_sunday === report.id_sunday)))
      })
  }, [collectiveSundays])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = sundays.filter(
            (sunday) => sunday.id_user === userRole.idUser
          )
          setFilteredSundays(filtered)
        } else {
          setFilteredSundays(sundays)
        }
      }
    }
  }, [credentials, roles, sundays, id])

  // collective Weekly
  const [collectiveWeeklies, setCollectiveWeeklies] = useState([])
  const [weeklies, setWeeklies] = useState([])
  const [filteredWeeklies, setFilteredWeeklies] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveWeekly`)
      .then(res => res.json())
      .then(data => {
        setCollectiveWeeklies(data.filter(report => report.id_collective === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/weekly`)
      .then(res => res.json())
      .then(data => {
        setWeeklies(data.filter(report => collectiveWeeklies.some(weekly => weekly.id_weekly === report.id_weekly)))
      })
  }, [collectiveWeeklies])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = weeklies.filter(
            (weekly) => weekly.id_user === userRole.idUser
          )
          setFilteredWeeklies(filtered)
        } else {
          setFilteredWeeklies(weeklies)
        }
      }
    }
  }, [credentials, roles, weeklies, id])

  // collective NGO WEEKLY
  const [collectiveNgoWeeklies, setCollectiveNgoWeeklies] = useState([])
  const [ngoWeeklies, setNgoWeeklies] = useState([])
  const [filteredNgoWeeklies, setFilteredNgoWeeklies] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/collectiveNgoWeekly`)
      .then(res => res.json())
      .then(data => {
        setCollectiveNgoWeeklies(data.filter(report => report.id_collective === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/ngoWeekly`)
      .then(res => res.json())
      .then(data => {
        setNgoWeeklies(data.filter(report => collectiveNgoWeeklies.some(ngoWeekly => ngoWeekly.id_ngo_weekly === report.id_ngo_weekly)))
      })
  }, [collectiveNgoWeeklies])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = ngoWeeklies.filter(
            (ngoWeekly) => ngoWeekly.id_user === userRole.idUser
          )
          setFilteredNgoWeeklies(filtered)
        } else {
          setFilteredNgoWeeklies(ngoWeeklies)
        }
      }
    }
  }, [credentials, roles, ngoWeeklies, id])

  useEffect(() => {
    fetch(`${URL}/associations`)
      .then(res => res.json())
      .then(data => {
        setAssociations(data)
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/subjects`)
      .then(res => res.json())
      .then(data => {
        setSubjectAssociation(data.filter(subject => subject.id_subject === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/collectives/${id}`)
      .then(res => res.json())
      .then(data => {
        setCollective(data[0])
        setNetworks(data[0].network_collective)
        setPersonal(data[0].personal_collective)
      })
      .catch(error => console.error('Error fetching collective', error))
  }, [id])

  useEffect(() => {
    fetch(`${URL}/issues`)
      .then(res => res.json())
      .then(data => {
        setIssues(data)
      })
  }, [])

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

  return (
    <main className='w-full h-full flex flex-col items-center'>
      <h2 className='text-center text-white text-3xl font-bold my-4'>{name_collective}</h2>
      <section className='w-2/3 grid grid-cols-2 gap-4'>
        <article className='text-white bg-custom-transparent overflow-hidden rounded-2xl pb-4'>
          <section className='w-full'>
            <img src='' alt='Organización' />
          </section>
          <section className='px-8 mt-4'>
            <p><span className='text-cyan-600'>Origen de la organización: </span>{origin_collective}</p>
            <p><span className='text-cyan-600'>Tipo de organización: </span>{type_collective}</p>
            <p><span className='text-cyan-600'>Sede: </span>{headquarters_collective}</p>
            <p><span className='text-cyan-600'>Descripción: </span>{description_collective}</p>
            <p><span className='text-cyan-600'>Misión:</span>{mission_collective}</p>
            <p><span className='text-cyan-600'>Visión: </span>{vision_collective}</p>
            <p><span className='text-cyan-600'>Área de influencia: </span>{inf_area_collective}</p>
            <p><span className='text-cyan-600'>Financiamiento: </span>{financing_collective}</p>
          </section>
          <section className='px-8 mt-4'>
            {
              Object.entries(networks).map(([key, value]) => (
                <p key={key}><span className='text-cyan-600'>{key}: </span> {value}</p>
              ))
            }
          </section>
        </article>
        <section className='flex flex-col gap-4'>
          <article className='flex-grow text-white bg-custom-transparent overflow-hidden rounded-2xl p-4'>
            <h3 className='text-center text-xl text-cyan-600 mb-3'>Personal</h3>
            <ul>
              {
                Object.entries(personal).map(([key, value]) => (
                  <li key={key}>
                    <p><span className='text-cyan-600'>{key}: </span>{value}</p>
                  </li>
                ))
              }
            </ul>
          </article>
          <article className='flex-grow text-white bg-custom-transparent overflow-hidden rounded-2xl p-4'>
            <h3 className='text-center text-xl text-cyan-600 mb-3'>Asociaciones</h3>
            <ul>
              {subjectAssociation.map(subject => {
                const associatedItem = associations.find(item => item.id_association === subject.id_association)

                return (
                  <li key={subject.id_subject}>
                    <div className='flex justify-between items-center border border-cyan-900 p-2'>
                      <p>
                        <span className='text-cyan-500'>Nombre: </span>
                        {associatedItem ? associatedItem.association : 'Asociación no encontrada'}
                      </p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <a className='bg-custom-red px-4 py-1' href={`/associationList/${subject.id_association}`}>Abrir</a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </article>
        </section>
        <h3 className='text-center col-span-2 text-cyan-500 text-2xl border-b border-cyan-950'>Informes</h3>
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
        <section className='text-white bg-custom-transparent col-span-2 grid grid-cols-2 gap-4 p-4'>
          <div className='h-[400px] overflow-auto self-center'>
            <h3 className='text-center text-cyan-500 text-xl'>Informe Diario</h3>
            <ul>
              {
                filteredDiaries
                  .filter(report => {
                    const reportDate = new Date(report.date_diary)
                    const start = starDate ? new Date(starDate) : null
                    const end = endDate ? new Date(endDate) : null
                    const matchesTheme = themefilter
                      ? report.issue_diary.toLowerCase().includes(themefilter.toLowerCase())
                      : true

                    return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
                  })
                  .map(report => (
                    <li key={report.id_diary} className='border border-cyan-900 p-2 flex items-center justify-between'>
                      <p><span className='text-cyan-500 mr-2'>Número: </span>{report.num_diary}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <div className='flex flex-col gap-2'>
                        <p><span className='text-cyan-500 mr-2'>Fecha: </span>{dateConvert(report.date_diary)}</p>
                        <p><span className='text-cyan-500 mr-2'>Temas: </span>{report.issue_diary}</p>
                      </div>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <Link className='bg-custom-red px-4 py-1' to={`${URL}${report.link_diary}`} target='_blanck'>Ver</Link>
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className='h-[400px] overflow-auto self-center'>
            <h3 className='text-center text-cyan-500 text-xl'>Informe Dominical</h3>
            <ul>
              {
                filteredSundays
                  .filter(report => {
                    const reportDate = new Date(report.date_sunday)
                    const start = starDate ? new Date(starDate) : null
                    const end = endDate ? new Date(endDate) : null
                    const matchesTheme = themefilter
                      ? report.issue_sunday.toLowerCase().includes(themefilter.toLowerCase())
                      : true

                    return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
                  })
                  .map(report => (
                    <li key={report.id_sunday} className='border border-cyan-900 p-2 flex items-center justify-between'>
                      <p><span className='text-cyan-500 mr-2'>Número: </span>{report.num_sunday}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <div className='flex flex-col gap-2'>
                        <p><span className='text-cyan-500 mr-2'>Fecha: </span>{dateConvert(report.date_sunday)}</p>
                        <p><span className='text-cyan-500 mr-2'>Temas: </span>{report.issue_sunday}</p>
                      </div>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <Link className='bg-custom-red px-4 py-1' to={`${URL}${report.link_sunday}`} target='_blanck'>Ver</Link>
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className='h-[400px] self-center'>
            <h3 className='text-center text-cyan-500 text-xl'>Informe Monitoreo</h3>
            <ul className='flex flex-col gap-2 overflow-auto'>
              {
                filteredMonitoring
                  .filter(report => {
                    const reportDate = new Date(report.date_monitoring)
                    const start = starDate ? new Date(starDate) : null
                    const end = endDate ? new Date(endDate) : null
                    const reportIssues = issues.filter(issue => issue.id_report === report.id_monitoring)
                    const matchesTheme = themefilter
                      ? reportIssues.some(issue => issue.issue_report.toLowerCase().includes(themefilter.toLowerCase()))
                      : true

                    return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
                  })
                  .map(report => (
                    <li key={report.id_monitoring} className='border border-cyan-900 p-2 flex items-center justify-between'>
                      <p><span className='text-cyan-500 mr-2'>Número: </span>{report.num_monitoring}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <div className='flex flex-col gap-2'>
                        <p><span className='text-cyan-500 mr-2'>Fecha: </span>{dateConvert(report.date_monitoring)}</p>
                        <p><span className='text-cyan-500 mr-2'>Temas: </span></p>
                        {
                          issues
                            .filter(issue => issue.id_report === report.id_monitoring)
                            .map(issue => (
                              <p key={issue.id_issues_report}><span className='text-cyan-500 mr-2'>* </span>{issue.issue_report}</p>
                            ))
                        }
                      </div>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <Link className='bg-custom-red px-4 py-1' to={`${URL}${report.link_monitoring}`} target='_blanck'>Ver</Link>
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className='h-[400px] overflow-auto self-center'>
            <h3 className='text-center text-cyan-500 text-xl'>Informe Semanal</h3>
            <ul>
              {
                filteredWeeklies
                  .filter(report => {
                    const reportDate = new Date(report.date_weekly)
                    const start = starDate ? new Date(starDate) : null
                    const end = endDate ? new Date(endDate) : null
                    const reportIssues = issues.filter(issue => issue.id_report === report.id_weekly)
                    const matchesTheme = themefilter
                      ? reportIssues.some(issue => issue.issue_report.toLowerCase().includes(themefilter.toLowerCase()))
                      : true

                    return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
                  })
                  .map(report => (
                    <li key={report.id_weekly} className='border border-cyan-900 p-2 flex items-center justify-between'>
                      <p><span className='text-cyan-500 mr-2'>Número: </span>{report.num_weekly}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <div className='flex flex-col gap-2'>
                        <p><span className='text-cyan-500 mr-2'>Fecha: </span>{dateConvert(report.date_weekly)}</p>
                        <p><span className='text-cyan-500 mr-2'>Temas: </span></p>
                        {
                          issues
                            .filter(issue => issue.id_report === report.id_weekly)
                            .map(issue => (
                              <p key={issue.id_issues_report}><span className='text-cyan-500 mr-2'>* </span>{issue.issue_report}</p>
                            ))
                        }
                      </div>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <Link className='bg-custom-red px-4 py-1' to={`${URL}${report.link_weekly}`} target='_blanck'>Ver</Link>
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className='h-[400px] overflow-auto self-center'>
            <h3 className='text-center text-cyan-500 text-xl'>Informe ONG semanal</h3>
            <ul>
              {
                filteredNgoWeeklies
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
                  .map(report => (
                    <li key={report.id_ngo_weekly} className='border border-cyan-900 p-2 flex items-center justify-between'>
                      <p><span className='text-cyan-500 mr-2'>Número: </span>{report.num_ngo_weekly}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <div className='flex flex-col gap-2'>
                        <p><span className='text-cyan-500 mr-2'>Fecha: </span>{dateConvert(report.date_ngo_weekly)}</p>
                        <p><span className='text-cyan-500 mr-2'>Temas: </span></p>
                        {
                          issues
                            .filter(issue => issue.id_report === report.id_ngo_weekly)
                            .map(issue => (
                              <p key={issue.id_issues_report}><span className='text-cyan-500 mr-2'>* </span>{issue.issue_report}</p>
                            ))
                        }
                      </div>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <Link className='bg-custom-red px-4 py-1' to={`${URL}${report.link_ngo_weekly}`} target='_blanck'>Ver</Link>
                    </li>
                  ))
              }
            </ul>
          </div>
          <div className='h-[400px] overflow-auto self-center'>
            <h3 className='text-center text-cyan-500 text-xl'>Informe Alerta</h3>
            <ul>
              {
                filteredAlerts
                  .filter(report => {
                    const reportDate = new Date(report.date_alert)
                    const start = starDate ? new Date(starDate) : null
                    const end = endDate ? new Date(endDate) : null
                    const matchesTheme = themefilter
                      ? report.issue_alert.toLowerCase().includes(themefilter.toLowerCase())
                      : true

                    return matchesTheme && (!start || reportDate >= start) && (!end || reportDate <= end)
                  })
                  .map(report => (
                    <li key={report.id_alert} className='border border-cyan-900 p-2 flex items-center justify-between'>
                      <p><span className='text-cyan-500 mr-2'>Número: </span>{report.num_alert}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <div className='flex flex-col gap-2'>
                        <p><span className='text-cyan-500 mr-2'>Fecha: </span>{dateConvert(report.date_alert)}</p>
                        <p><span className='text-cyan-500 mr-2'>Temas: </span>{report.issue_alert}</p>
                      </div>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <Link className='bg-custom-red px-4 py-1' to={`${URL}${report.link_alert}`} target='_blanck'>Ver</Link>
                    </li>
                  ))
              }
            </ul>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Collective

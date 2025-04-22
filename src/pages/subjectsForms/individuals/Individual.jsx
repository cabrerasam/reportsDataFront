/* eslint-disable camelcase */
/* eslint camelcase: ['error', {'properties': 'never', ignoreDestructuring: true}] */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dateConvert } from '../../../helpers/dateConvert'
import { URL } from '../../../helpers/config'

const Individual = () => {
  const { id } = useParams()
  const [attribute, setAttribute] = useState('none')
  const [individual, setIndividual] = useState({})
  const [networks, setNetworks] = useState({})
  const [speachs, setSpeachs] = useState([])
  const [associations, setAssociations] = useState([])
  const [subjectAssociation, setSubjectAssociation] = useState([])
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

  // Reports
  // Individuals Diaries
  const [individualDiaries, setIndividualDiaries] = useState([])
  const [diaries, setDiaries] = useState([])
  const [filteredDiaries, setFilteredDiaries] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualDiaries`)
      .then(res => res.json())
      .then(data => {
        setIndividualDiaries(data.filter(report => report.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/diaries`)
      .then(res => res.json())
      .then(data => {
        setDiaries(data.filter(report => individualDiaries.some(diary => diary.id_diary === report.id_diary)))
      })
  }, [individualDiaries])

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

  //  Individual Monitoring
  const [individualMonitoring, setIndividualMonitoring] = useState([])
  const [monitoring, setMonitoring] = useState([])
  const [filteredMonitoring, setFilteredMonitoring] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualMonitoring`)
      .then(res => res.json())
      .then(data => {
        setIndividualMonitoring(data.filter(report => report.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/monitoring`)
      .then(res => res.json())
      .then(data => {
        setMonitoring(data.filter(report => individualMonitoring.some(monitoring => monitoring.id_monitoring === report.id_monitoring)))
      })
  }, [individualMonitoring])

  useEffect(() => {
    if (credentials && roles.length > 0) {
      const userRole = roles.find((role) => role.id_role === credentials.idRole)
      if (userRole) {
        if (userRole.name_role !== 'Director') {
          const filtered = monitoring.filter(
            (monitoring) => monitoring.id_user === userRole.idUser
          )
          setFilteredMonitoring(filtered)
        } else {
          setFilteredMonitoring(monitoring)
        }
      }
    }
  }, [credentials, roles, monitoring, id])

  // Individual Alert
  const [individualAlerts, setIndividualAlerts] = useState([])
  const [alerts, setAlerts] = useState([])
  const [filteredAlerts, setFilteredAlerts] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualAlert`)
      .then(res => res.json())
      .then(data => {
        setIndividualAlerts(data.filter(report => report.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/alerts`)
      .then(res => res.json())
      .then(data => {
        setAlerts(data.filter(report => individualAlerts.some(alert => alert.id_alert === report.id_alert)))
      })
  }, [individualAlerts])

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

  // Individual Sunday
  const [individualSundays, setIndividualSundays] = useState([])
  const [sundays, setSundays] = useState([])
  const [filteredSundays, setFilteredSundays] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualSunday`)
      .then(res => res.json())
      .then(data => {
        setIndividualSundays(data.filter(report => report.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/sundays`)
      .then(res => res.json())
      .then(data => {
        setSundays(data.filter(report => individualSundays.some(sunday => sunday.id_sunday === report.id_sunday)))
      })
  }, [individualSundays])

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

  // Individual Weekly
  const [individualWeeklies, setIndividualWeeklies] = useState([])
  const [weeklies, setWeeklies] = useState([])
  const [filteredWeeklies, setFilteredWeeklies] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualWeekly`)
      .then(res => res.json())
      .then(data => {
        setIndividualWeeklies(data.filter(report => report.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/weekly`)
      .then(res => res.json())
      .then(data => {
        setWeeklies(data.filter(report => individualWeeklies.some(weekly => weekly.id_weekly === report.id_weekly)))
      })
  }, [individualWeeklies])

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

  // Individual NGO WEEKLY
  const [individualNgoWeeklies, setIndividualNgoWeeklies] = useState([])
  const [ngoWeeklies, setNgoWeeklies] = useState([])
  const [filteredNgoWeeklies, setFilteredNgoWeeklies] = useState([])

  useEffect(() => {
    fetch(`${URL}/intermediate/individualNgoWeekly`)
      .then(res => res.json())
      .then(data => {
        setIndividualNgoWeeklies(data.filter(report => report.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/ngoWeekly`)
      .then(res => res.json())
      .then(data => {
        setNgoWeeklies(data.filter(report => individualNgoWeeklies.some(ngoWeekly => ngoWeekly.id_ngo_weekly === report.id_ngo_weekly)))
      })
  }, [individualNgoWeeklies])

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

  // ASSOCIATIONS

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
    fetch(`${URL}/speachs`)
      .then(res => res.json())
      .then(data => {
        setSpeachs(data.filter(speach => speach.id_individual === id))
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/individuals/${id}`)
      .then(res => res.json())
      .then(data => {
        setNetworks(data[0].networks_individual)
        setIndividual(data[0])
      })
  }, [id])

  useEffect(() => {
    fetch(`${URL}/issues`)
      .then(res => res.json())
      .then(data => {
        setIssues(data)
      })
  }, [])

  const {
    birthdate_individual,
    education_individual,
    email_individual,
    gender_individual,
    marital_status_individual,
    name_individual,
    nationality_individual,
    party_individual,
    phone_individual,
    photo_individual,
    place_birth_individual,
    work_individual
  } = individual

  const {
    facebook,
    x,
    instagram,
    youtube,
    tiktok
  } = networks

  const date = dateConvert(birthdate_individual)

  const changeAtribute = () => {
    if (attribute === 'none') {
      setAttribute('block')
    } else {
      setAttribute('none')
    }
  }

  return (
    <main className='w-full h-full flex flex-col items-center pb-4'>
      <h2 className='text-center text-white text-3xl font-bold my-4'>{name_individual}</h2>
      <section className='w-2/3 grid grid-cols-2 gap-4'>
        <article className='text-white h-[830px] bg-custom-transparent overflow-hidden pb-4'>
          <section className='w-full'>
            <img className='w-full object-fill' src={`${URL}${photo_individual}`} alt={name_individual} />
          </section>
          <section className='px-8 mt-4'>
            <p><span className='text-cyan-600'>Nacionalidad: </span>{nationality_individual}</p>
            <p><span className='text-cyan-600'>Fecha de nacimiento: </span>{date}</p>
            <p><span className='text-cyan-600'>Lugar de nacimiento: </span>{place_birth_individual}</p>
            <p><span className='text-cyan-600'>Género: </span>{gender_individual}</p>
            <p><span className='text-cyan-600'>Estado civil: </span>{marital_status_individual}</p>
            <p><span className='text-cyan-600'>Nivel profecional: </span>{education_individual}</p>
            <p><span className='text-cyan-600'>Teléfono: </span>{phone_individual}</p>
            <p><span className='text-cyan-600'>Correo electrónico: </span>{email_individual}</p>
            <p><span className='text-cyan-600'>Partido político: </span>{party_individual}</p>
            <p><span className='text-cyan-600'>Trabajo: </span>{work_individual}</p>
          </section>
          <section className='px-8 mt-4'>
            <p><span className='text-cyan-600'>Facebook: </span><a href={facebook}>{facebook}</a></p>
            <p><span className='text-cyan-600'>X: </span><a href={x}>{x}</a></p>
            <p><span className='text-cyan-600'>Instagram: </span><a href={instagram}>{instagram}</a></p>
            <p><span className='text-cyan-600'>Youtube: </span><a href={youtube}>{youtube}</a></p>
            <p><span className='text-cyan-600'>Youtube: </span><a href={tiktok}>{tiktok}</a></p>
          </section>
        </article>
        <section className='flex flex-col gap-4'>
          <article className='flex-grow text-white bg-custom-transparent overflow-hidden py-4'>
            <h3 className='text-center text-xl text-cyan-600 mb-3'>Discursos</h3>
            <ul className='overflow-auto scrollbar-thin scrollbar-thumb-cyan-950 scrollbar-track-cyan-800 px-4'>
              {
                speachs.map(speach => (
                  <li key={speach.id_speach}>
                    <section className='aspect-w-16 aspect-h-9 w-2/3 h-auto absolute bg-custom-transparent p-8 left-[16.6%] right-[25%] top-[5%] rounded-2xl' style={{ display: attribute }}>
                      <video className='w-full' src={`${URL}${speach.speach}`} controls />
                      <button className='absolute top-0 right-0 bg-custom-red px-4 py-1' onClick={changeAtribute}>X</button>
                    </section>
                    <div className='flex justify-between items-center border border-cyan-900 p-2'>
                      <p><span className='text-cyan-500'>Título: </span> {speach.title_speach}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <p><span className='text-cyan-500'>Fecha: </span>{dateConvert(speach.date_speach)}</p>
                      <div className='w-px h-[30px] bg-cyan-900' />
                      <button className='bg-custom-red px-4 py-1' target='_blanck' onClick={changeAtribute}>Ver</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </article>
          <article className='flex-grow text-white bg-custom-transparent overflow-hidden p-4'>
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

export default Individual

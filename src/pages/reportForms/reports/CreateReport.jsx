import { useState, useEffect } from 'react'
import { URL } from '../../../helpers/config.js'

const CreateReport = () => {
  const [userId, setUserId] = useState('')
  const [report, setReport] = useState({})
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch(`${URL}/login/authorized`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setUserId(data.user.idUser)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('areaReport', e.target.areaReport.value)
    formData.append('typeReport', e.target.typeReport.value)
    formData.append('priorityReport', e.target.priorityReport.value)
    formData.append('confidentialityReport', e.target.confidentialityReport.value)
    formData.append('numReport', e.target.numReport.value)
    formData.append('dateReport', e.target.dateReport.value)
    formData.append('file', e.target.file.files[0])
    formData.append('idUser', userId)

    try {
      fetch(`${URL}/report`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data[0].create_report)
          setReport(data[0].create_report)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const [newsList, setNewsList] = useState([])

  const handleNewsList = (e) => {
    e.preventDefault()

    const form = e.target.closest('form')
    const body = {
      issueReport: e.target.issue.value,
      tagsIssuesReport: e.target.tags.value,
      idReport: report.id_report
    }
    setNewsList([...newsList, body])
    form.reset()
  }

  const handleSubmitNews = () => {
    try {
      fetch(`${URL}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsList)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          setNews(data)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteNews = (index) => {
    const newList = newsList.filter((_, i) => i !== index)
    setNewsList(newList)
  }

  return (
    <main className='w-3/4 mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-white font-medium text-center text-xl my-3'>Crear informe</h1>
      <section className='w-full grid grid-cols-3 gap-4'>
        <form onSubmit={handleSubmit} className='w-[450px] h-[390px] justify-self-center self-center justify-center flex flex-col gap-3 bg-cyan-950 p-4' encType='multipart/form-data'>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white '>Área del informe</p>
            <select name='areaReport' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md'>
              <option value=''>Selecionar área</option>
              <option value='area1'>Nacional</option>
              <option value='area2'>Internacional</option>
            </select>
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Tipo de Informe</p>
            <select name='typeReport' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md'>
              <option value=''>Selecionar tipo</option>
              <option value='informe1'>Alerta</option>
              <option value='informe2'>Monitoreo</option>
              <option value='informe3'>Dominical</option>
            </select>
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Prioridad</p>
            <input type='text' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='priorityReport' />
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Confidencialidad</p>
            <input type='text' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='confidentialityReport' />
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Número</p>
            <input type='text' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='numReport' />
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Fecha</p>
            <input type='date' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='dateReport' />
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Informe</p>
            <input type='file' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='file' />
          </label>
          <button className='bg-cyan-700 text-white px-2 py-1 rounded-md' type='submit'>Cargar Informe</button>
        </form>
        <section className='w-[450px] h-[390px] p-4 bg-cyan-950 justify-self-center self-center'>
          <h2 className='text-center text-white font-medium text-lg'>Informe creado</h2>
          <p>Número de informe: {report.num_report}</p>
          <p>Fecha de creación: {report.date_report}</p>
          <p>Prioridad: {report.priority_report}</p>
          <p>Confidencialidad: {report.confidentiality_report}</p>
          <a href={report.link_report}>Informe</a>
        </section>
        <form onSubmit={handleNewsList} className='w-[450px] h-[390px] flex flex-col gap-4 p-4 justify-self-center self-center bg-cyan-950'>
          <h2 className='text-white font-medium text-center text-lg mt-4'>Crear Noticias del informe</h2>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Noticia</p>
            <input type='text' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='issue' />
          </label>
          <label className='grid grid-cols-2 gap-4'>
            <p className='text-white'>Palabras clave</p>
            <input type='text' className='ml-2 text-cyan-950 bg-gray-100 px-2 rounded-md' name='tags' />
          </label>
          <button className='bg-cyan-700 text-white px-2 py-1 rounded-md' type='submit'>crear Noticias</button>
        </form>
        <section className='p-4 w-[900px] h-[390px] bg-cyan-950 overflow-auto flex flex-col gap-2 justify-self-center self-center col-span-2'>
          <h2 className='text-white font-medium text-center text-lg mt-4'>Noticias agregadas</h2>
          <section className='flex flex-col overflow-auto'>
            {
              newsList.map((item, index) => (
                <div key={index} className='border border-cyan-700 flex justify-center items-center gap-2 my-1 p-2 text-white'>
                  <p className='w-1/2'><span className='text-cyan-500'>Noticia:</span> {item.issueReport}</p>
                  <div className='w-[1px] h-3/4 bg-cyan-500 mx-2' />
                  <p className='w-1/4'><span className='text-cyan-500'>Noticia:</span> {item.tagsIssuesReport}</p>
                  <div className='w-[1px] h-3/4 bg-cyan-500 mx-2' />
                  <button className='w-1/4 bg-cyan-700 text-white' onClick={() => handleDeleteNews(index)}>Eliminar</button>
                </div>
              ))
            }
          </section>
          <button className='bg-cyan-700 text-white px-2 py-1 rounded-md' onClick={handleSubmitNews}>Cargar noticia</button>
        </section>
        <section className='p-4 w-[450px] h-[390px] bg-cyan-950 overflow-auto flex flex-col gap-2 justify-self-center self-center'>
          <h2 className='text-white font-medium text-center text-lg mt-4'>Noticias subidas</h2>
          {
            news.map((item, index) => (
              <div key={index} className='border border-blue-500 my-2 p-2'>
                <p className='text-white'>Noticia: {item.issue_report}</p>
                <p className='text-white'>Tags: {item.tags_issues_report}</p>
              </div>
            ))
          }
        </section>
      </section>
    </main>
  )
}

export default CreateReport

const CreateReport = () => {
  return (
    <main className='w-3/4 mx-auto my-10 border border-cyan-950 p-4 flex flex-col items-center'>
      <h1 className='text-white font-medium text-center text-lg'>CreateReport</h1>
      <form className='w-full flex flex-col gap-4 mt-4'>
        <label>
          Tipo de Informe
          <select name='reportType' className='ml-2 text-black'>
            <option value='informe1'>Informe 1</option>
            <option value='informe2'>Informe 2</option>
            <option value='informe3'>Informe 3</option>
          </select>
        </label>
        <label>
          Área del informe
          <select name='reportArea' className='ml-2 text-black'>
            <option value='area1'>Área 1</option>
            <option value='area2'>Área 2</option>
            <option value='area3'>Área 3</option>
          </select>
        </label>
      </form>
    </main>
  )
}

export default CreateReport

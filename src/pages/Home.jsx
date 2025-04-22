import bolivia from '../assets/bolivia.png'
const Home = () => {
  return (
    <main className='h-full flex flex-col justify-center items-center main-home pt-[80px]'>
      <h1 className='text-7xl font-bold mb-8 text-white'>Bienvenidos</h1>
      <div className='w-2/4 grid grid-cols-2 items-center'>
        <img className='w-3/4' src={bolivia} alt='Bolivia' />
        <section className='text-white flex flex-col text-5xl gap-4 font-bold border-l pl-9'>
          <h2>UNIDAD DE</h2>
          <h2>ANÁLISIS DE LA</h2>
          <h2>INFORMACIÓN</h2>
          <h2>GUBERNAMENTAL</h2>
        </section>
      </div>
    </main>
  )
}

export default Home

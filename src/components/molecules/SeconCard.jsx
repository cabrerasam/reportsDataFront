/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const SeconCard = ({ imgSrc, title, textOne, textTwo, textThree, linkOne, linkTwo, linkThree }) => {
  const [atribute, setAtribute] = useState('')

  useEffect(() => {
    if (textThree) {
      setAtribute('block')
    } else {
      setAtribute('none')
    }
  }, [textThree])

  const styles = 'block px-3 py-[2px] bg-gray-600 w-[100px] rounded-md hover:bg-red-900 transition-colors duration-300'

  return (
    <article className='flex flex-col w-[200px] items-center text-white border border-gray-700 py-4 rounded-lg'>
      <p className='text-2xl'>{title}</p>
      <div className='w-[100px] h-[100px] rounded-full flex justify-center items-center'>
        <img src={imgSrc} alt={`Crear ${title}`} />
      </div>
      <section className='flex flex-col gap-2 mt-4 text-center font-thin'>
        <a className={styles} href={linkOne}>{textOne}</a>
        <a className={styles} href={linkTwo}>{textTwo}</a>
        <a className={styles} href={linkThree} style={{ display: atribute }}>{textThree}</a>
      </section>
    </article>
  )
}

export default SeconCard

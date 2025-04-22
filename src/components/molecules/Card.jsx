/* eslint-disable react/prop-types */

const Card = ({ title, img, click, styles }) => {
  return (
    <article className='cursor-pointer w-[300px] h-[450px] border border-gray-700 flex flex-col items-center justify-center rounded-2xl gap-8 relative overflow-hidden before:bg-gradient-to-t from-gray-900 from-10% via-gray-950 via-50% to-gray-900 to-100% before:w-full before:h-full before:absolute before:opacity-0 before:top-[0px] before:left-0 before:z-[-1] before:content-[""] hover:before:opacity-100 hover:before:transition-[opacity] hover:before:duration-300' onClick={click} style={styles}>
      <img className='w-[150px]' src={img} alt='' />
      <h2>{title}</h2>
    </article>
  )
}

export default Card

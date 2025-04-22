/* eslint-disable react/prop-types */
const ButtonDark = ({ textButton, typeButton }) => {
  return (
    <button type={typeButton} className='w-24 h-10 bg-cyan-950 hover:bg-cyan-600 text-white rounded-2xl'>
      {textButton}
    </button>
  )
}

export default ButtonDark

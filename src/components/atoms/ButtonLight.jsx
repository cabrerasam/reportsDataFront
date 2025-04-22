/* eslint-disable react/prop-types */
const ButtonLight = ({ textButton, typeButton }) => {
  return (
    <button type={typeButton} className='w-24 h-10 bg-red-500 hover:bg-red-600 text-white rounded-2xl'>
      {textButton}
    </button>
  )
}

export default ButtonLight

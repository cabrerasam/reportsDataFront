/* eslint-disable react/prop-types */
const DataSubject = ({ spanText, pText }) => {
  return (
    <p className='mb-2'><span className='text-cyan-500 font-bold'>{spanText}: </span>{pText}</p>
  )
}

export default DataSubject

/* eslint-disable react/prop-types */
const InputText = ({ textLabel, nameText }) => {
  return (
    <label className='text-white mt-2 flex items-center justify-between gap-4'>
      <span>{textLabel}</span>
      <textarea
        name={nameText}
        className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
      />
    </label>
  )
}

export default InputText

/* eslint-disable react/prop-types */
const Input = ({ textLabel, nameInput, typeInput, placeholder, value, onChange }) => {
  return (
    <label className='text-white mt-2 flex items-center justify-between gap-4'>
      <span>{textLabel}</span>
      <input
        type={typeInput}
        name={nameInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='text-gray-800 px-2 bg-slate-100 flex-grow-0 w-72'
      />
    </label>
  )
}

export default Input

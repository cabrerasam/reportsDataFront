/* eslint-disable react/prop-types */
const InputFile = ({ nameFile, textLabel, defaultValue }) => {
  return (
    <label className='text-white mt-2 flex items-center justify-between gap-4'>
      <span className=''>{textLabel}</span>
      <input
        type='file' name={nameFile} defaultValue={defaultValue}
        className='w-72 px-2 text-xs text-slate-500 bg-slate-100 p-1 file:mr-4 file:text-xs file:bg-red-500 file:border-none file:text-white file:py-1 file:px-2 file:rounded-full'
      />
    </label>
  )
}

export default InputFile

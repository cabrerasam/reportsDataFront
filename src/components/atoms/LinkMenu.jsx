/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const LinkMenu = ({ link, textLink }) => {
  return (
    <Link to={link} className='text-white text-base flex items-center'>
      {textLink}
    </Link>
  )
}

export default LinkMenu

import { URL } from '../helpers/config'

export const UseData = async ({ endpoint }) => {
  try {
    const reponse = await fetch(`${URL}/${endpoint}`)
    const data = await reponse.json()
    return data
  } catch (error) {
    console.error('Error al obtener datos:', error)
    return { error: 'Error al obtener datos' }
  }
}

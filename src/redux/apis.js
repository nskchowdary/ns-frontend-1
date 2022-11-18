import axios from '../utilities/axios'

export const getPapers = async () => {
  const data = await axios.get('/paper')
  return data
}

export const getShapes = async () => {
  const data = await axios.get('/paper')
  return data
}

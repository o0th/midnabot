import axios from 'axios'

const pairs = async () => {
  const response = await axios.get('https://api.kraken.com/0/public/AssetPairs')
  return Object.keys(response.data.result)
}

export const crypto = { pairs }

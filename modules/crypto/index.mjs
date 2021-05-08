import axios from 'axios'

const pairs = await (async () => {
  const response = await axios.get('https://api.kraken.com/0/public/AssetPairs')
  return Object.keys(response.data.result)
})();

const shortcuts = {
  BITCOIN: 'XBTUSDT',
  XBT: 'XBTUSDT',
  BTC: 'XBTUSDT',

  ETHERIUM: 'XETHUSD',
  ETH: 'XETHUSD',

  DOGE: 'XDGUSD',

  RIPPLE: 'XXRPZUSD',
  XRP: 'XXRPZUSD',

  FLOW: 'FLOWUSD',

  ADA: 'ADAUSD',
  CARDANO: 'ADAUSD',

  XLM: 'XXLMZUSD',
  STELLAR: 'XXLMZUSD'
}

export const crypto = async (ctx) => {
  const message = ctx.message.text
  const argument = message.match(/\/crypto ([A-Za-z]+)/)[1].toUpperCase()

  const pair = (Object.keys(shortcuts).includes(argument))
    ? shortcuts[argument]
    : argument

	if (pairs.includes(pair)) {
    const response = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
    const price = response.data.result[pair].a[0]
    const open = response.data.result[pair].o
    const perc = (price - open) / open * 100
    const sign = perc >= 0 ? '+' : ''
    ctx.reply(`${pair}: ${price} (${sign}${perc.toFixed(2)}% 24h)`)
  } else {
    ctx.reply('Pair not found')
  }
}

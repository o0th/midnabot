const axios = require('axios')

const pairs = require('./pairs.json')

const shortcuts = {
  BITCOIN: 'XBTUSDT',
  XBT: 'XBTUSDT',
  BTC: 'XBTUSDT',

  ETHERIUM: 'XETHZUSD',
  ETH: 'XETHZUSD',

  DOGE: 'XDGUSD',
  XDG: 'XDGUSD',

  RIPPLE: 'XXRPZUSD',
  XRP: 'XXRPZUSD',

  FLOW: 'FLOWUSD',

  CARDANO: 'ADAUSD',
  ADA: 'ADAUSD',

  STELLAR: 'XXLMZUSD',
  XLM: 'XXLMZUSD'
}

const crypto = async (ctx) => {
  const message = ctx.message.text
  const argument = message.match(/\/crypto ([A-Za-z]+)/)?.[1].toUpperCase()

  if (!argument) {
    const cryptos = Object.keys(shortcuts)
    const message = 'Example:\n' +
      '/crypto bitcoin\n\n' +
      'Cryptocurrencies available:\n' +
      `${cryptos.join(', ')}\n\n` +
      'Or any pair from:\n' +
      'https://api.kraken.com/0/public/AssetPairs'

    return ctx.reply(message)
  }

  const pair = (Object.keys(shortcuts).includes(argument))
    ? shortcuts[argument]
    : argument

  if (Object.keys(pairs).includes(pair)) {
    const response = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${pair}`)
    const wsname = pairs[pair].wsname
    const price = Number(response.data.result[pair].a[0])
    const decimals = Number(pairs[pair].pair_decimals)
    const open = Number(response.data.result[pair].o)
    const perc = (price - open) / open * 100
    const sign = perc > 0 ? '+' : ''
    ctx.reply(`${wsname}: ${price.toFixed(decimals)} (${sign}${perc.toFixed(2)}% 24h)`)
  } else {
    ctx.reply('Pair not found')
  }
}

module.exports = { crypto }

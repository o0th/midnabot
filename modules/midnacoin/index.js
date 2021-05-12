
const collect = new Map()

const midnacoin = (ctx) => {
  const message = ctx.message.text
  const argument = message.match(/\/midnacoin ([A-Za-z]+)/)?.[1].toLowerCase()

  if (!argument) {
    const message = 'Midnacoin commands:\n' +
      '/midnacoin amount - get midnacoin amount\n' +
      '/midnacoin collect - get midnacoin every hour'

    return ctx.reply(message)
  }

  if (argument === 'amount') {
    if (!collect.has(ctx.from.id)) {
      ctx.reply(`@${ctx.from.username} you have 0 midnacoin`)
    } else {
      const obj = collect.get(ctx.from.id)
      ctx.reply(`@${ctx.from.username} you have ${obj.amount} midnacoins`)
    }
  }

  if (argument === 'collect') {
    if (ctx.from.is_bot === false) {
      if (!collect.has(ctx.from.id)) {
        const obj = {
          amount: 1000,
          time: new Date().getTime()
        }
        collect.set(ctx.from.id, obj)
        ctx.reply(`${obj.amount}`)
      } else {
        const obj = collect.get(ctx.from.id)
        const diff = new Date().getTime() - obj.time
        if (diff >= 60000) {
          const lucky = Math.floor(Math.random() * 100)
          if (lucky >= 0 && lucky < 50) obj.amount += 50
          if (lucky >= 50 && lucky < 80) obj.amount += 100
          if (lucky >= 80 && lucky < 90) obj.amount += 250
          if (lucky >= 90) obj.amount += 500
          obj.time = new Date().getTime()
          collect.set(ctx.from.id, obj)
          ctx.reply(`${obj.amount}`)
        } else {
          ctx.reply('Too soon')
        }
      }
    }
  }
}

module.exports = { midnacoin }

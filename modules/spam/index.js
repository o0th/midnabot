let overflow = false

const flow = (ctx, next) => {
  if (!overflow) {
    overflow = true
    setTimeout(() => { overflow = false }, 1000)
    next()
  }

  process.stdout.write('Overflow protection\n')
}

module.exports = { flow }

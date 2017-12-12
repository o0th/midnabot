const stop = () => (ctx) =>
  ctx.state.starts.start(false, `Bye`)

module.exports = { stop }

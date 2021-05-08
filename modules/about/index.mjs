import config from '../../package.json'

export const about = (ctx) => {
  const about = `*Midnabot* v${config.version}\n` +
    `${config.homepage}`
  ctx.replyWithMarkdown(about)
}

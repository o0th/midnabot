const Koa = require('koa')
const app = new Koa()

// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

app.listen(process.env.PORT)

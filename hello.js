
export default function Hello(app) {
  app.get('/hello', (req, res) => { res.send('Life a!') })
  app.get('/', (req, res) => {
    res.send('Welcome to Full Stack Development!')
  })
}
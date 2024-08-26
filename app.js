const express = require('express')
const app = express();
const db = require('./db/connection')
const bodyParser = require('body-parser')

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`)
})

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))

//Db Connection
db.authenticate()
.then(()=>{
    console.log("Banco conectado")
})
.catch(err=>{
    console.log("Ocorreu um erro ao conectar", err)
})

// Routes
app.get('/', (req, res) => {
    res.send("Teste 1")
})
app.use('/jobs', require('./routes/jobs'))
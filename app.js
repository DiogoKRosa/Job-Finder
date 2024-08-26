const express = require('express')
const app = express();
const db = require('./model/connection')

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`)
})

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
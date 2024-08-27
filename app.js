const express = require('express');
const exphbs = require('express-handlebars');
const app = express();;
const db = require('./db/connection');
const bodyParser = require('body-parser');
const path = require('path');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`O express está rodando na porta ${PORT}`)
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

//handle bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// static folder
app.use(express.static(path.join(__dirname, 'public')))

//Db Connection
db.authenticate()
    .then(() => {
        console.log("Banco conectado")
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err)
    })

// Routes
app.get('/', (req, res) => {

    let search = req.query.job
    let query = '%'+search+'%'

    if (!search) {
        Job.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(jobs => {
                res.render('index', { jobs })
            })
            .catch(err => console.log(err))
    }else{
        Job.findAll({
            where: {title: {[Op.like]:query}},
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(jobs => {
                res.render('index', { jobs, search })
            })
            .catch(err => console.log(err))
    }
})
app.use('/jobs', require('./routes/jobs'))
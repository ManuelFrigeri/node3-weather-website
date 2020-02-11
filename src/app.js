const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const forcast = require ('./utils/forcast')
const geocode = require ('./utils/geocode')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Andrew Mead'
    })
})
app.get('/about', (req,res) => {
res.render('about', {
    title: 'About',
    name: 'me'
})
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help',
        message: 'ti serve aiuto?',
        name: 'Manuel'
    })
    })

    app.get('/products', (req,res) => {
        if (!req.query.search) {
           return res.send({
               error: 'you must provide a search term'
           })}

        console.log(req.query.search)
        res.send({ 
            products: [], 
        })  
        })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
    return res.send({
        error: 'you must provide an address'
    })
    }
    geocode (req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error})
         }
     forcast (longitude, latitude, (error, forcastdata) => {
         if (error) {
            return res.send({
                error})
         }
         res.send({ 
            forcast: forcastdata,
            location,
             address: req.query.address,
        })
         })
     }) 

        
})
app.get('/help/*', (req,res) => {
    res.render('404', {
        error: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
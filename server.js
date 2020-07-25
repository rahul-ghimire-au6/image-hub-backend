const express=require('express')
const app = express()
const user_routes=require('./routes/user_routes')
const image_routes=require('./routes/image_routes')
const morgan = require('morgan')
require('./helper/db_setting')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var cors = require('cors')
app.use(cors())



app.use(user_routes)
app.use(image_routes)

app.get('/',(req,res)=>res.send({'value':'success','message':'Welcome to Image Hub Created By Rahul R Ghimire'}))

const port = process.env.PORT || 8080 

app.listen(port, console.log(`server listening at ${port}`))
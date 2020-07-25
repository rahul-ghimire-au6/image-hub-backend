const express=require('express')
const app = express()
const user_routes=require('./routes/user_routes')
const image_routes=require('./routes/image_routes')
const morgan = require('morgan')
require('./helper/db_setting')
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(user_routes)
app.use(image_routes)

const port = process.env.PORT || 8080 

app.listen(port, console.log(`server listening at ${port}`))
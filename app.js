const express =require ('express')
const app = express()
const logger = require('morgan')
const connectDB = require('./db/connect')
require('dotenv').config()
const user =require('./routes/users')

//Middleware declaration
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger('tiny'))


//ROUTE DECLARATION
app.use('/user',user)







/// Server setup
const port = process.env.PORT || 5000
const start =async () =>{
    try {
    await connectDB(process.env.MONGO_URI)
    console.log('CONNECTED TO THE DB...')
   app.listen(port, () =>console.log(`Server is listening  at ${port}....`));
    }catch(err){
    console.log(err);
    }
}

start()

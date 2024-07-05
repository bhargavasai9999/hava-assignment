import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { CreateDBConnection } from './database/database.js'
import { importData } from './database/importData.js'
import { AirportRouter } from './routes/airport.router.js'
dotenv.config()

const PORT=process.env.EXPRESS_PORT || 5000
const app=express()

app.use(express.json())
app.use(cors())
app.use('/api',AirportRouter)

await CreateDBConnection()

await importData()
app.listen(PORT,()=>{

    console.log(`Server is Running on PORT ${PORT}`)

})
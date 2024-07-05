import { DataSource } from "typeorm";
import dotenv from 'dotenv'
dotenv.config()
import { CountrySchema } from "../models/Country.js";
import { AirportSchema } from "../models/Airport.js";
import { CitySchema } from "../models/City.js";
export const AppDataSource=new DataSource({
    type:'postgres',
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    ssl:{
        rejectUnauthorized:false
    },
    synchronize: true,
    entities: [CountrySchema,CitySchema,AirportSchema]
})


export const CreateDBConnection=async()=>{
    await AppDataSource.initialize()

    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((error)=>{
        console.log("DB error: ",error)

        process.exit(1)
    })
}
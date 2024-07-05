import express from 'express'
import { getAirportByIATACode } from '../controllers/getAirportByIATA.js'
const router=express.Router()

router.get('/airportdetails/:iata_code',async (req,res)=>{
    const {iata_code}=req.params
   try {
    const response=await getAirportByIATACode(iata_code)
    if (response){
        return res.send(response)
    }
    else{
        return res.send(null)
    }

   } catch (error) {
    console.log(error)
   }
})
export const AirportRouter=router
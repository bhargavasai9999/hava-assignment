import { AppDataSource } from "../database/database.js";
import { AirportSchema } from "../models/Airport.js";


export const getAirportByIATACode=async(iata_code)=> {
  try {
    const airportDetails = await AppDataSource.getRepository(AirportSchema)
    .createQueryBuilder('airport') 
    .select([
        'airport.id',
        'airport.icao_code',
        'airport.iata_code',
        'airport.name',
        'airport.type',
        'airport.latitude_deg',
        'airport.longitude_deg',
        'airport.elevation_ft',
        'airport.created_at',
        'airport.updated_at',
        'city.id',  
        'city.name AS city_name',  
        'country.id',  
        'country.name AS country_name',  
        'country.country_code_two',
        'country.country_code_three',
        'country.mobile_code'
    ])
    .leftJoinAndSelect('City', 'city', 'city.id = airport.city_id') 
    .leftJoinAndSelect('Country', 'country', 'country.id = airport.country_id') 
    .where('airport.iata_code = :iata_code', { iata_code })
    .getRawOne()
    const formattedAirportDetails = {
        airport: {
          id: airportDetails.airport_id,
          icao_code: airportDetails.airport_icao_code,
          iata_code: airportDetails.airport_iata_code,
          name: airportDetails.airport_name,
          type: airportDetails.airport_type,
          latitude_deg: airportDetails.airport_latitude_deg,
          longitude_deg: airportDetails.airport_longitude_deg,
          elevation_ft: airportDetails.airport_elevation_ft,
         
            city: {
              id: airportDetails.city_id,
              name: airportDetails.city_name,
              country_id: airportDetails.city_country_id,
              is_active: airportDetails.city_is_active,
              lat: airportDetails.city_lat,
              long: airportDetails.city_long
            },
            country: {
              id: airportDetails.country_id,
              name: airportDetails.country_name,
              country_code_two: airportDetails.country_country_code_two,
              country_code_three: airportDetails.country_country_code_three,
              mobile_code: airportDetails.country_mobile_code,
              continent_id: airportDetails.country_continent_id
            }
          
        }
      };
      

        return formattedAirportDetails
    
     
    
  } catch (error) {
    console.error('Error fetching airport:', error);
    return { error: 'Internal server error' };
  }
}


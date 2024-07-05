import { AppDataSource } from "./database.js";
import { AirportSchema } from "../models/Airport.js";
import { CitySchema } from "../models/City.js";
import { CountrySchema } from "../models/Country.js";
import xlsx from 'xlsx';
import path from 'path';

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const importData = async () => {
  try {
    console.log("Importing Excel data to the database...");

    const cwd = process.cwd();
    const pathname = path.join(cwd, 'database/Database.xlsx');

    const workbook = xlsx.readFile(pathname);
    const sheets = workbook.SheetNames;

    const countryData = xlsx.utils.sheet_to_json(workbook.Sheets[sheets[1]]);
    const cityData = xlsx.utils.sheet_to_json(workbook.Sheets[sheets[2]]);
    const airportData = xlsx.utils.sheet_to_json(workbook.Sheets[sheets[0]]);


    await AppDataSource.transaction(async transactionalEntityManager => {
      const countryRepository = transactionalEntityManager.getRepository(CountrySchema);
      const cityRepository = transactionalEntityManager.getRepository(CitySchema);
      const airportRepository = transactionalEntityManager.getRepository(AirportSchema);

      await countryRepository.save(countryData.map(country => ({
        id: country.id,
        name: country.name.trim(),
        alt_name: country.alt_name?.trim() || '',
        country_code_two: country.country_code_two.trim(),
        country_code_three: country.country_code_three.trim(),
        flag_app: country.flag_app?.trim() || '',
        mobile_code: country.mobile_code,
        continent_id: country.continent_id,
        country_flag: country.country_flag?.trim() || '',
      })));

      await cityRepository.save(cityData.map(city => ({
        id: city.id,
        name: city.name.trim(),
        alt_name: city.alt_name?.trim() || '',
        country_id: city.country_id,
        is_active: city.is_active,
        lat: city.lat,
        long: city.long,
      })));

      const airportChunks = chunkArray(airportData, 3000);

      for (const chunk of airportChunks) {
        await airportRepository.save(chunk.map(airport => ({
          id: airport.id,
          icao_code: airport.icao_code.trim(),
          iata_code: airport.iata_code.trim(),
          name: airport.name.trim(),
          type: airport.type.trim(),
          latitude_deg: airport.latitude_deg,
          longitude_deg: airport.longitude_deg,
          elevation_ft: airport.elevation_ft,
          city_id: airport.city_id || null,
          country_id: airport.country_id || null,
          continent_id: airport.continent_id,
          website_url: airport.website_url?.trim() || null,
          wikipedia_link: airport.wikipedia_link?.trim() || null,
          created_at: new Date(),
          updated_at: new Date()
        })));
        console.log("chunk completed")
      }
    });

    console.log("Import completed successfully");
  } catch (error) {
    console.error("Error importing data:", error);
  }
};

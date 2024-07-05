import { EntitySchema } from "typeorm";

export const AirportSchema = new EntitySchema({
  name: "Airport",
  tableName: "airports",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: false,
    },
    icao_code: {
      type: "varchar",
      nullable: false,
    },
    iata_code: {
      type: "varchar",
      nullable: false,
    },
    name: {
      type: "varchar",
      nullable: false,
    },
    type: {
      type: "varchar",
      nullable: false,
    },
    latitude_deg: {
      type: "double precision",
      nullable: false,
    },
    longitude_deg: {
      type: "double precision",
      nullable: false,
    },
    elevation_ft: {
      type: "int",
      nullable: true,
    },
    city_id: {
      type: "int",
      nullable: true,
    },
    country_id: {
      type: "int",
      nullable: true,
    },
    continent_id:{
      type:'int',
      nullable:false
    },
    website_url: {
      type: "varchar",
      nullable: true,
    },
    wikipedia_link: {
      type: "varchar",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
    
  }, 
  // relations: {
  //   city: {
  //       type: "many-to-one",
  //       target: "City",
  //       joinColumn: { 
  //         name: "city_id",
  //         referencedColumnName: "id",
  //         nullable:true
  //        },
  //   },
  //   country: {
  //     type: "many-to-one",
  //     target: "Country",
  //     joinColumn: {
  //         name: "country_id",
  //         referencedColumnName: "id",
  //         nullable:true
  //     },
  // },
  // }
 
});
